const Idea = require('../models/Idea');
const sendEmail = require('../utils/sendEmail');

// Submit a new idea
const submitIdea = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            name,
            email,
            tags,
            implementationTimeframe,
            expectedImpact
        } = req.body;

        // Create new idea
        const idea = new Idea({
            title,
            description,
            category,
            submittedBy: {
                name,
                email
            },
            tags: tags || [],
            implementationTimeframe,
            expectedImpact
        });

        await idea.save();

        // Send confirmation email
        try {
            await sendEmail({
                email,
                subject: 'Thank you for submitting your idea to RavionLab',
                template: 'ideaSubmission',
                data: {
                    name,
                    title,
                    ideaId: idea._id
                }
            });
        } catch (error) {
            console.error('Error sending confirmation email:', error);
            // Don't throw error as idea is already saved
        }

        // Notify admin
        try {
            await sendEmail({
                email: process.env.ADMIN_EMAIL,
                subject: 'New Idea Submission',
                template: 'adminIdeaNotification',
                data: {
                    title,
                    category,
                    submitterName: name,
                    ideaId: idea._id
                }
            });
        } catch (error) {
            console.error('Error sending admin notification:', error);
        }

        res.status(201).json({
            message: 'Idea submitted successfully',
            data: idea
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error submitting idea',
            error: error.message
        });
    }
};

// Get all ideas (admin only)
const getIdeas = async (req, res) => {
    try {
        const { status, category, sort = '-createdAt' } = req.query;
        const query = {};

        // Add filters if provided
        if (status) query.status = status;
        if (category) query.category = category;

        const ideas = await Idea.find(query)
            .sort(sort)
            .populate('reviewedBy', 'fullName email');

        res.json({
            message: 'Ideas retrieved successfully',
            data: ideas
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving ideas',
            error: error.message
        });
    }
};

// Update idea status (admin only)
const updateIdeaStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, reviewNotes } = req.body;

        const idea = await Idea.findById(id);

        if (!idea) {
            return res.status(404).json({
                message: 'Idea not found'
            });
        }

        idea.status = status;
        idea.reviewNotes = reviewNotes;
        idea.reviewedBy = req.user.id;
        idea.reviewedAt = Date.now();

        await idea.save();

        // Send email notification to submitter
        try {
            await sendEmail({
                email: idea.submittedBy.email,
                subject: `Your idea submission has been ${status}`,
                template: 'ideaStatusUpdate',
                data: {
                    name: idea.submittedBy.name,
                    title: idea.title,
                    status,
                    reviewNotes,
                    ideaId: idea._id
                }
            });
        } catch (error) {
            console.error('Error sending status update email:', error);
        }

        res.json({
            message: 'Idea status updated successfully',
            data: idea
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating idea status',
            error: error.message
        });
    }
};

// Get idea by ID
const getIdea = async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id)
            .populate('reviewedBy', 'fullName email');

        if (!idea) {
            return res.status(404).json({
                message: 'Idea not found'
            });
        }

        res.json({
            message: 'Idea retrieved successfully',
            data: idea
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving idea',
            error: error.message
        });
    }
};

module.exports = {
    submitIdea,
    getIdeas,
    updateIdeaStatus,
    getIdea
}; 