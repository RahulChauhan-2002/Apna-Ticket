import express from 'express';
import {postTicket} from '../controllers/postTicketController.js';

const router=express.Router();

router.post("/postTicket",postTicket);

export default router;

