import express from "express"
import { signup, login } from "../controller/user.controller.js"
const router = express.Router()
import asyncWrap from "../utils/AsyncWrap.js"

router.post("/signup", asyncWrap(signup ))
router.post("/login", asyncWrap(login ))

export default router;