import express from 'express';
import asyncWrap from "../utils/AsyncWrap.js";
import { forgotPassword } from "../controller/forgotpassword.controller.js";
import { resetPassword } from "../controller/forgotpassword.controller.js";
const router = express.Router()

router.post("/forgot-password", asyncWrap(forgotPassword))
router.post("/reset-password/:token", asyncWrap(resetPassword))

export default router;