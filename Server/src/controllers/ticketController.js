import Ticket from '../models/ticketPostModel.js'; // Apne model ka sahi path dein

// @desc    Fetch all tickets
// @route   GET /api/v1/tickets
export const getAllTicketsController = async (req, res) => {
    try {
        // Database se saare tickets laayein, naye waale sabse upar
        const tickets = await Ticket.find({}).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tickets.length,
            data: tickets,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};