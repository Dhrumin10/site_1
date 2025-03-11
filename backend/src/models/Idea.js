const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: [
            'Artificial Intelligence',
            'Machine Learning',
            'Robotics',
            'Healthcare',
            'Sustainability',
            'Education',
            'Other'
        ]
    },
    submittedBy: {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        }
    },
    status: {
        type: String,
        enum: ['pending', 'under-review', 'approved', 'rejected'],
        default: 'pending'
    },
    reviewNotes: {
        type: String,
        trim: true
    },
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewedAt: Date,
    tags: [{
        type: String,
        trim: true
    }],
    implementationTimeframe: {
        type: String,
        enum: ['immediate', 'short-term', 'long-term'],
        default: 'short-term'
    },
    expectedImpact: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    }
}, {
    timestamps: true
});

// Indexes for better query performance
ideaSchema.index({ status: 1 });
ideaSchema.index({ 'submittedBy.email': 1 });
ideaSchema.index({ category: 1 });
ideaSchema.index({ createdAt: -1 });

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea; 