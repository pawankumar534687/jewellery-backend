import express from 'express';
import { message } from '../controller/messages.controller.js';
import asyncWrap from '../utils/AsyncWrap.js'; 
const router = express.Router();

router.post("/message", asyncWrap(message))

export default router;