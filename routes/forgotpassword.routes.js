import express from 'express';
import asyncWrap from "../utils/AsyncWrap.js";
import { forgotPassword } from "../controller/forgotpassword.controller.js";
import { resetPassworod } from "../controller/forgotpassword.controller.js";
const router = express.Router()

router.post("/forgot-password", asyncWrap(forgotPassword))
router.post("/reset-password/:token", asyncWrap(resetPassworod))

export default router;