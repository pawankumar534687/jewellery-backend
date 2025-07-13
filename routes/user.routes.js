import express from "express"
import { signup, login } from "../controller/user.controller.js"
const router = express.Router()
import asyncWrap from "../utils/AsyncWrap.js"
import { getusers } from "../controller/user.controller.js"
import { adminLogin } from "../controller/user.controller.js"
import authMiddleware from "../middlewares/verifyToken.js"

router.post("/signup", asyncWrap(signup))
router.post("/login", asyncWrap(login))
router.get("/getusers", authMiddleware, asyncWrap(getusers))
router.post("/admin-login", asyncWrap(adminLogin))

export default router;