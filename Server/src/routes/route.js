import express from 'express';
import { postTicketController } from '../controllers/postTicketController.js';
import { signupController, loginController, logoutController } from '../controllers/userController.js';
import { 
    getAllTicketsController, 
    getTicketByIdController, 
    updateTicketStatusController 
} from '../controllers/ticketController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createBookingController } from '../controllers/bookingController.js';

const router = express.Router();

// --- User Authentication Routes ---
router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);

// --- Ticket Routes ---
router.post("/postTicket", authMiddleware, postTicketController);
router.get("/tickets", getAllTicketsController);
router.get("/tickets/:id", getTicketByIdController);
router.patch("/tickets/:id/status", authMiddleware, updateTicketStatusController);

// --- Booking Route ---
router.post("/book-ticket", createBookingController);

export default router;
