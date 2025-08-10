import Booking from '../models/bookingModel.js';

// @desc    Create a new booking
// @route   POST /api/v1/book-ticket
export const createBookingController = async (req, res) => {
    try {
        const { name, email, mobile, state, city } = req.body;

        // Basic validation
        if (!name || !email || !mobile || !state || !city) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields.',
            });
        }

        const newBooking = await Booking.create({
            name,
            email,
            mobile,
            state,
            city,
        });

        res.status(201).json({
            success: true,
            message: 'Booking successful! We will contact you shortly.',
            data: newBooking,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};
