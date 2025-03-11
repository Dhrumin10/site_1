const Redis = require('ioredis');
const logger = require('./logger');

// Create Redis client
const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    retryStrategy: function (times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

redis.on('error', (err) => {
    logger.error('Redis Client Error:', err);
});

redis.on('connect', () => {
    logger.info('Redis Client Connected');
});

// Cache middleware
const cache = (duration) => {
    return async (req, res, next) => {
        if (req.method !== 'GET') {
            return next();
        }

        const key = `cache:${req.originalUrl || req.url}`;

        try {
            const cachedResponse = await redis.get(key);

            if (cachedResponse) {
                const data = JSON.parse(cachedResponse);
                return res.json(data);
            }

            // Modify res.json to cache the response
            const originalJson = res.json;
            res.json = function (body) {
                redis.setex(key, duration, JSON.stringify(body))
                    .catch(err => logger.error('Redis cache error:', err));
                return originalJson.call(this, body);
            };

            next();
        } catch (error) {
            logger.error('Cache middleware error:', error);
            next();
        }
    };
};

// Clear cache by pattern
const clearCache = async (pattern) => {
    try {
        const keys = await redis.keys(pattern);
        if (keys.length > 0) {
            await redis.del(keys);
            logger.info(`Cache cleared for pattern: ${pattern}`);
        }
    } catch (error) {
        logger.error('Clear cache error:', error);
    }
};

// Cache wrapper for mongoose queries
const cacheQuery = async (key, callback, duration = 3600) => {
    try {
        const cachedData = await redis.get(key);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const freshData = await callback();
        await redis.setex(key, duration, JSON.stringify(freshData));
        return freshData;
    } catch (error) {
        logger.error('Cache query error:', error);
        return await callback();
    }
};

module.exports = {
    redis,
    cache,
    clearCache,
    cacheQuery
}; 