import express from 'express';
import { postTicketController } from '../controllers/postTicketController.js';
import { signupController, loginController } from '../controllers/userController.js'; // User controller import karein
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post("/signup", signupController);
router.post("/login", loginController);

router.post("/postTicket", authMiddleware, postTicketController);


export default router;

