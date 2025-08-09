import express from 'express';
import {postTicket} from '../controllers/postTicket.js';

const router=express.Router();

router.post("/postTicket",postTicket);

export default router;

