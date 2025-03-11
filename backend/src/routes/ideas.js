const express = require('express');
const { body } = require('express-validator');
const {
    submitIdea,
    getIdeas,
    updateIdeaStatus,
    getIdea
} = require('../controllers/ideas');
const { protect, admin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { ideaLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Validation rules
const submitIdeaValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 100 })
        .withMessage('Title cannot be more than 100 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 2000 })
        .withMessage('Description cannot be more than 2000 characters'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required')
        .isIn([
            'Artificial Intelligence',
            'Machine Learning',
            'Robotics',
            'Healthcare',
            'Sustainability',
            'Education',
            'Other'
        ])
        .withMessage('Invalid category'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    body('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array'),
    body('implementationTimeframe')
        .optional()
        .isIn(['immediate', 'short-term', 'long-term'])
        .withMessage('Invalid implementation timeframe'),
    body('expectedImpact')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Invalid expected impact')
];

const updateIdeaStatusValidation = [
    body('status')
        .trim()
        .notEmpty()
        .withMessage('Status is required')
        .isIn(['pending', 'under-review', 'approved', 'rejected'])
        .withMessage('Invalid status'),
    body('reviewNotes')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Review notes cannot exceed 1000 characters')
];

// Routes
router.post('/', ideaLimiter, validate(submitIdeaValidation), submitIdea);
router.get('/', protect, admin, getIdeas);
router.get('/:id', protect, getIdea);
router.patch('/:id/status', protect, admin, validate(updateIdeaStatusValidation), updateIdeaStatus);

module.exports = router; 