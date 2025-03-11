const fs = require('fs').promises;
const path = require('path');

class FileStore {
    constructor(options = {}) {
        this.filename = options.filename || 'rate-limits.json';
        this.syncInterval = options.syncInterval || 5000; // 5 seconds
        this.limits = new Map();
        this.dirty = false;

        // Load existing data
        this.load();

        // Periodically save to file
        setInterval(() => this.save(), this.syncInterval);
    }

    async load() {
        try {
            const data = await fs.readFile(this.filename, 'utf8');
            const parsed = JSON.parse(data);
            this.limits = new Map(Object.entries(parsed));
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.error('Error loading rate limits:', error);
            }
        }
    }

    async save() {
        if (!this.dirty) return;

        try {
            const data = Object.fromEntries(this.limits);
            await fs.writeFile(this.filename, JSON.stringify(data, null, 2));
            this.dirty = false;
        } catch (error) {
            console.error('Error saving rate limits:', error);
        }
    }

    async increment(key, windowMs) {
        const now = Date.now();
        let limit = this.limits.get(key);

        if (!limit || limit.resetAt <= now) {
            limit = {
                count: 0,
                resetAt: now + windowMs
            };
        }

        limit.count += 1;
        this.limits.set(key, limit);
        this.dirty = true;

        return limit;
    }

    async cleanup() {
        const now = Date.now();
        for (const [key, limit] of this.limits.entries()) {
            if (limit.resetAt <= now) {
                this.limits.delete(key);
                this.dirty = true;
            }
        }
    }
}

// Create file-based rate limiter middleware
const createFileRateLimiter = (windowMs, max, options = {}) => {
    const store = new FileStore(options);

    // Clean up expired entries periodically
    setInterval(() => store.cleanup(), options.cleanupInterval || 60000);

    return async (req, res, next) => {
        const key = req.ip;

        try {
            const limit = await store.increment(key, windowMs);

            // Set headers
            res.setHeader('RateLimit-Limit', max);
            res.setHeader('RateLimit-Remaining', Math.max(0, max - limit.count));
            res.setHeader('RateLimit-Reset', Math.ceil(limit.resetAt / 1000));

            if (limit.count > max) {
                return res.status(429).json({
                    message: 'Too many requests, please try again later.'
                });
            }

            next();
        } catch (error) {
            console.error('Rate limiting error:', error);
            next();
        }
    };
};

// Create rate limiters
const fileApiLimiter = createFileRateLimiter(
    15 * 60 * 1000, // 15 minutes
    100, // 100 requests per window
    { filename: path.join(__dirname, '../../data/api-rate-limits.json') }
);

const fileAuthLimiter = createFileRateLimiter(
    60 * 60 * 1000, // 1 hour
    5, // 5 requests per window
    { filename: path.join(__dirname, '../../data/auth-rate-limits.json') }
);

const fileApplicationLimiter = createFileRateLimiter(
    24 * 60 * 60 * 1000, // 24 hours
    3, // 3 applications per day
    { filename: path.join(__dirname, '../../data/application-rate-limits.json') }
);

module.exports = {
    fileApiLimiter,
    fileAuthLimiter,
    fileApplicationLimiter
}; 