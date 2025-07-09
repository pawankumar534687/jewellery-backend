import express from 'express';
import { message } from '../controller/messages.controller.js';
import asyncWrap from '../utils/AsyncWrap.js'; 
import authMiddleware from '../middlewares/verifyToken.js';
import { getmessage } from '../controller/messages.controller.js';
import { deletemessage } from '../controller/messages.controller.js';

const router = express.Router();

router.post("/message",   asyncWrap(message))
router.get("/all-inquiries", authMiddleware,   asyncWrap(getmessage))
router.delete("/delete-message/:id", authMiddleware, asyncWrap(deletemessage))

export default router;