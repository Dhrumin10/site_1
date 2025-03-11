const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    background: {
        type: String,
        required: [true, 'Background information is required']
    },
    areaOfInterest: {
        type: String,
        required: [true, 'Area of interest is required']
    },
    motivation: {
        type: String,
        required: [true, 'Motivation is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index to prevent duplicate pending applications from same email
applicationSchema.index({ email: 1, status: 1 });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application; 