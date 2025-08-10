import express from 'express';
import { postTicketController } from '../controllers/postTicketController.js';
import { signupController, loginController } from '../controllers/userController.js';
import { getAllTicketsController } from '../controllers/ticketController.js'; // Naya controller import karein
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// --- User Routes ---
router.post("/signup", signupController);
router.post("/login", loginController);

// --- Ticket Routes ---
router.post("/postTicket", authMiddleware, postTicketController);
router.get("/tickets", getAllTicketsController); // Naya route add karein

export default router;

