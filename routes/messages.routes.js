import express from 'express';
import { message } from '../controller/messages.controller.js';
import asyncWrap from '../utils/AsyncWrap.js'; 
import authMiddleware from '../middlewares/verifyToken.js';
const router = express.Router();

router.post("/message", authMiddleware ,asyncWrap(message))

export default router;