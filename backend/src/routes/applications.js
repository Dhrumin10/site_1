const express = require('express');
const { body } = require('express-validator');
const {
    getApplications,
    createApplication,
    updateApplication,
    getApplication
} = require('../controllers/applicationController');
const { protect, admin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { applicationLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Validation rules
const createApplicationValidation = [
    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Full name is required')
        .isLength({ min: 2 })
        .withMessage('Full name must be at least 2 characters long'),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    body('background')
        .trim()
        .notEmpty()
        .withMessage('Background is required')
        .isIn(['Student', 'Professional', 'Researcher', 'Entrepreneur', 'Other'])
        .withMessage('Invalid background selection'),
    body('areaOfInterest')
        .trim()
        .notEmpty()
        .withMessage('Area of interest is required')
        .isIn([
            'Artificial Intelligence',
            'Robotics',
            'Quantum Computing',
            'Machine Learning',
            'Healthcare AI',
            'Sustainability'
        ])
        .withMessage('Invalid area of interest selection'),
    body('motivation')
        .trim()
        .notEmpty()
        .withMessage('Motivation is required')
        .isLength({ min: 50 })
        .withMessage('Motivation must be at least 50 characters long')
        .isLength({ max: 1000 })
        .withMessage('Motivation cannot exceed 1000 characters')
];

const updateApplicationValidation = [
    body('status')
        .trim()
        .notEmpty()
        .withMessage('Status is required')
        .isIn(['pending', 'approved', 'rejected'])
        .withMessage('Invalid status'),
    body('reviewNotes')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Review notes cannot exceed 500 characters')
];

// Routes
router.get('/', protect, admin, getApplications);
router.post('/', applicationLimiter, validate(createApplicationValidation), createApplication);
router.get('/:id', protect, getApplication);
router.patch('/:id', protect, admin, validate(updateApplicationValidation), updateApplication);

module.exports = router; 