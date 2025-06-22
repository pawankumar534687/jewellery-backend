import express from 'express'
const router = express.Router()
import { edit } from '../controller/editprofile.controller.js'
import asyncWrap from '../utils/AsyncWrap.js';
import {saveprofile} from "../controller/editprofile.controller.js"
import authMiddleware from '../middlewares/verifyToken.js';

router.get("/editprofile/:id", authMiddleware,  asyncWrap(edit))
router.put("/saveprofile/:id", authMiddleware, asyncWrap(saveprofile))

export default router;