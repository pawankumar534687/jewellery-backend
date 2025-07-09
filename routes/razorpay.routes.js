import express from "express";
import { createRazorpayOrder, verifyPayment } from "../controller/razorpay.controller.js";
import asyncWrap from "../utils/AsyncWrap.js";
import authMiddleware from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/create-razorpay-order", authMiddleware, asyncWrap(createRazorpayOrder));
router.post("/verify-payment", authMiddleware, asyncWrap(verifyPayment));

export default router;
