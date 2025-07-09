import express from 'express'
import { applyCoupon, getcoupons } from '../controller/coupons.controller.js'
import { createCoupon } from '../controller/coupons.controller.js'
import asyncWrap from '../utils/AsyncWrap.js'
import { deletecoupon } from '../controller/coupons.controller.js'
import { getcouponbyid } from '../controller/coupons.controller.js'
import { editcoupon } from '../controller/coupons.controller.js'
import authMiddleware from '../middlewares/verifyToken.js'
const router = express.Router()

router.post("/apply-coupon", authMiddleware,  asyncWrap(applyCoupon))
router.post("/create-coupon", authMiddleware, asyncWrap(createCoupon))
router.get("/get-coupons", authMiddleware, asyncWrap(getcoupons))
router.delete("/delete-coupon/:id", authMiddleware, asyncWrap(deletecoupon))
router.get("/edit-coupon-form/:id", authMiddleware, asyncWrap(getcouponbyid))
router.put("/edit-coupon/:id", authMiddleware, asyncWrap(editcoupon))

export default router;