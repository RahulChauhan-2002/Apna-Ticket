import Booking from '../models/bookingModel.js';
import Ticket from '../models/ticketPostModel.js'; // Ticket model import karein
import nodemailer from 'nodemailer';

// --- Nodemailer Setup ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// @desc    Create a new booking and notify the seller
// @route   POST /api/v1/book-ticket
export const createBookingController = async (req, res) => {
    try {
        const { name, email, mobile, state, city, ticketId } = req.body;

        // 1. Validation
        if (!name || !email || !mobile || !state || !city || !ticketId) {
            return res.status(400).json({ success: false, message: 'Please fill all fields and provide a ticket ID.' });
        }

        // 2. Ticket dhoondhein jise book kiya jaa raha hai
        const ticketToBook = await Ticket.findById(ticketId);
        if (!ticketToBook) {
            return res.status(404).json({ success: false, message: 'Ticket not found.' });
        }

        // 3. Booking data save karein
        await Booking.create({ name, email, mobile, state, city, ticketId });

        // --- 4. Seller ko Email Notification Bhejein ---
        const sellerEmail = ticketToBook.email;
        const messageToSeller = `Hi! Someone is interested in your ticket from ${ticketToBook.from} to ${ticketToBook.to}. Contact them soon!\n\nBuyer Details:\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}`;

        // Email Bhejein
        try {
            await transporter.sendMail({
                from: `"Apna Ticket" <${process.env.EMAIL_USER}>`,
                to: sellerEmail,
                subject: 'New Booking Request for Your Ticket!',
                text: messageToSeller,
            });
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
            // Email fail hone par process ko rokna nahin hai
        }

        res.status(201).json({
            success: true,
            message: 'Booking request sent successfully! The ticket owner will contact you soon.',
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
