const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Skill name is required'],
        trim: true,
        unique: true
    },
    category: {
        type: String,
        required: [true, 'Skill category is required'],
        enum: [
            'Programming Languages',
            'Frameworks',
            'AI/ML',
            'Robotics',
            'Quantum Computing',
            'Cloud Technologies',
            'DevOps',
            'Other'
        ]
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        required: true
    },
    icon: {
        type: String,
        default: 'default-skill-icon.png'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
}, {
    timestamps: true
});

// Index for better search performance
skillSchema.index({ name: 'text', description: 'text' });

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill; 