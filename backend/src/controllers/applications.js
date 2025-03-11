const Application = require('../models/Application');

// Get all applications (admin only)
const getApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .sort({ createdAt: -1 })
            .populate('reviewedBy', 'fullName email');

        res.json({
            success: true,
            message: 'Applications retrieved successfully',
            data: applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving applications',
            error: error.message
        });
    }
};

// Create new application
const createApplication = async (req, res) => {
    try {
        const { fullName, email, background, areaOfInterest, motivation } = req.body;

        // Check for existing pending application
        const existingApplication = await Application.findOne({
            email,
            status: 'pending'
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: 'You already have a pending application',
                error: 'Duplicate application'
            });
        }

        const application = new Application({
            fullName,
            email,
            background,
            areaOfInterest,
            motivation
        });

        await application.save();

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            data: application
        });
    } catch (error) {
        console.error('Application creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting application',
            error: error.message
        });
    }
};

// Update application status (admin only)
const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, reviewNotes } = req.body;

        const application = await Application.findById(id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        application.status = status;
        application.reviewNotes = reviewNotes;
        application.reviewedBy = req.user.id;
        application.reviewedAt = Date.now();

        await application.save();

        res.json({
            success: true,
            message: 'Application updated successfully',
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating application',
            error: error.message
        });
    }
};

// Get application by ID
const getApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('reviewedBy', 'fullName email');

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.json({
            success: true,
            message: 'Application retrieved successfully',
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving application',
            error: error.message
        });
    }
};

module.exports = {
    getApplications,
    createApplication,
    updateApplication,
    getApplication
}; 