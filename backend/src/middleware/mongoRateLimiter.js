const mongoose = require('mongoose');

// Rate limit schema
const rateLimitSchema = new mongoose.Schema({
    key: { type: String, required: true, index: true },
    count: { type: Number, default: 0 },
    resetAt: { type: Date, required: true }
}, {
    timestamps: true
});

const RateLimit = mongoose.model('RateLimit', rateLimitSchema);

// Create MongoDB-based rate limiter
const createMongoRateLimiter = (windowMs, max) => {
    return async (req, res, next) => {
        const key = req.ip;
        const now = new Date();

        try {
            // Find or create rate limit document
            let rateLimit = await RateLimit.findOne({
                key,
                resetAt: { $gt: now }
            });

            if (!rateLimit) {
                // Create new rate limit if not exists or expired
                rateLimit = new RateLimit({
                    key,
                    count: 0,
                    resetAt: new Date(now.getTime() + windowMs)
                });
            }

            // Increment count
            rateLimit.count += 1;
            await rateLimit.save();

            // Set headers
            res.setHeader('RateLimit-Limit', max);
            res.setHeader('RateLimit-Remaining', Math.max(0, max - rateLimit.count));
            res.setHeader('RateLimit-Reset', Math.ceil(rateLimit.resetAt.getTime() / 1000));

            // Check if limit exceeded
            if (rateLimit.count > max) {
                return res.status(429).json({
                    message: 'Too many requests, please try again later.'
                });
            }

            next();
        } catch (error) {
            console.error('Rate limiting error:', error);
            next(); // Continue on error
        }
    };
};

// Create rate limiters
const mongoApiLimiter = createMongoRateLimiter(
    15 * 60 * 1000, // 15 minutes
    100 // 100 requests per window
);

const mongoAuthLimiter = createMongoRateLimiter(
    60 * 60 * 1000, // 1 hour
    5 // 5 requests per window
);

const mongoApplicationLimiter = createMongoRateLimiter(
    24 * 60 * 60 * 1000, // 24 hours
    3 // 3 applications per day
);

module.exports = {
    mongoApiLimiter,
    mongoAuthLimiter,
    mongoApplicationLimiter
}; 