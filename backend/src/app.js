const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
require('dotenv').config();
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const { errorHandler } = require('./middleware/error');
const logger = require('./utils/logger');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// 🔹 CORS Configuration (Improved)
const allowedOrigins = [
    'https://site-sable-beta.vercel.app',
    process.env.FRONTEND_URL,
    'http://localhost:3000' // Add localhost for development
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, etc)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log(`Origin ${origin} not allowed by CORS`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// 🔹 Middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(helmet());
app.use(morgan('dev'));
app.use(mongoSanitize());
app.use(xss());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(compression());

// 🔹 Debugging - Log all incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url} from ${req.headers.origin || 'Unknown Origin'}`);
    console.log('Request Body:', req.body);
    next();
});

// 🔹 Rate Limiting
const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT_MAX || 100, // Max requests
    message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

// 🔹 Routes (Ensure API routes exist)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/applications', require('./routes/applications')); // Ensure route exists
app.use('/api/skills', require('./routes/skills'));
app.use('/api/ideas', require('./routes/ideas'));

// 🔹 Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage()
    });
});

// 🔹 General Error Handling
app.use(errorHandler);

// 🔹 Handle CORS Errors
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            message: 'CORS Error: Origin not allowed',
            error: process.env.NODE_ENV === 'development' ? err.message : {}
        });
    }
    next(err);
});

// 🔹 Handle 404 Not Found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Cannot ${req.method} ${req.url}`
    });
});

// 🔹 Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
    logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    logger.error(err.name, err.message, err.stack);
    process.exit(1);
});

// 🔹 Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
    logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
    logger.error(err.name, err.message, err.stack);
    server.close(() => process.exit(1));
});

// 🔹 Handle SIGTERM (Graceful Shutdown)
process.on('SIGTERM', () => {
    logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => logger.info('💥 Process terminated!'));
});

// 🔹 Start the Server
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on http://${HOST}:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        logger.info(`Port ${PORT} is busy. Trying port ${PORT + 1}`);
        server.listen(PORT + 1, HOST);
    } else {
        logger.error('Server error:', err);
    }
});
