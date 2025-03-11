const rateLimit = require('express-rate-limit');

// Create different rate limiters for different routes
const createRateLimiter = (windowMs, max, message) => {
    return rateLimit({
        windowMs,
        max,
        message: {
            message: message || 'Too many requests, please try again later.'
        },
        standardHeaders: true,
        legacyHeaders: false
    });
};

// General API rate limiter
const apiLimiter = createRateLimiter(
    15 * 60 * 1000, // 15 minutes
    100, // 100 requests per window
    'Too many requests from this IP, please try again after 15 minutes'
);

// Auth endpoints rate limiter (more strict)
const authLimiter = createRateLimiter(
    60 * 60 * 1000, // 1 hour
    5, // 5 requests per window
    'Too many login attempts, please try again after an hour'
);

// Application submission rate limiter
const applicationLimiter = createRateLimiter(
    24 * 60 * 60 * 1000, // 24 hours
    3, // 3 applications per day
    'Maximum application limit reached for today'
);

// Idea submission rate limiter (more lenient)
const ideaLimiter = createRateLimiter(
    24 * 60 * 60 * 1000, // 24 hours
    10, // 10 ideas per day
    'Maximum idea submission limit reached for today'
);

module.exports = {
    apiLimiter,
    authLimiter,
    applicationLimiter,
    ideaLimiter
}; 