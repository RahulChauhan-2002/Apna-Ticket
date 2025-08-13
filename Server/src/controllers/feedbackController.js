import Feedback from '../models/feedbackModel.js';

// @desc    Create a new feedback or issue report
// @route   POST /api/v1/feedback
export const createFeedbackController = async (req, res) => {
    try {
        const { formType, message } = req.body;

        if (!formType || !message) {
            return res.status(400).json({ success: false, message: 'Message cannot be empty.' });
        }

        // Agar user login hai, to uski ID bhi save karein
        const userId = req.user ? req.user._id : null;

        await Feedback.create({
            formType,
            message,
            user: userId,
        });

        res.status(201).json({
            success: true,
            message: `${formType} submitted successfully! Thank you.`,
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
