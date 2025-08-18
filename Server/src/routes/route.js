import express from 'express';
import passport from 'passport';
import { postTicketController } from '../controllers/postTicketController.js';
import { signupController, loginController, logoutController, googleCallbackController } from '../controllers/userController.js';
import { 
    getAllTicketsController, 
    getTicketByIdController, 
    updateTicketStatusController,
    deleteTicketController 
} from '../controllers/ticketController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createBookingController } from '../controllers/bookingController.js';
import { getMeController } from '../controllers/userController.js';
import { createFeedbackController } from '../controllers/feedbackController.js';
import { getMyPostedTickets, getMyBookedTickets, deleteMyBooking } from '../controllers/profileController.js';

const router = express.Router();

// --- Profile Routes ---
router.get("/profile/my-posted-tickets", authMiddleware, getMyPostedTickets);
router.get("/profile/my-booked-tickets", authMiddleware, getMyBookedTickets);
router.delete("/profile/bookings/:id", authMiddleware, deleteMyBooking);

router.get("/me", authMiddleware, getMeController); 

// --- User Authentication Routes ---
router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/feedback", authMiddleware, createFeedbackController);
router.get("/me", authMiddleware, getMeController); 

// --- Google Auth Routes ---
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    googleCallbackController
);

// --- Ticket Routes ---
router.post("/postTicket", authMiddleware, postTicketController);
router.get("/tickets", getAllTicketsController);
router.get("/tickets/:id", getTicketByIdController);
router.patch("/tickets/:id/status", authMiddleware, updateTicketStatusController);
router.delete("/tickets/:id", authMiddleware, deleteTicketController);

// --- Booking Route ---
router.post("/book-ticket", createBookingController);

export default router;
