const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Replace localhost with 127.0.0.1 to force IPv4
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ravion_lab';

        const conn = await mongoose.connect(MONGODB_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4 // Force IPv4
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Handle errors after initial connection
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected. Attempting to reconnect...');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });

        // Create indexes
        await Promise.all([
            require('../models/User').createIndexes(),
            require('../models/Application').createIndexes(),
            require('../models/Project').createIndexes(),
            require('../models/Skill').createIndexes()
        ]);

        return conn;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        // Retry connection
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectDB, 5000);
    }
};

module.exports = connectDB; 