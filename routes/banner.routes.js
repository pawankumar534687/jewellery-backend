import asyncWrap from "../utils/AsyncWrap.js"
import express from "express" 
const router = express.Router()
import { createbanner } from "../controller/banner.controller.js"
import authMiddleware from "../middlewares/verifyToken.js"
import getUpload from '../cloudconfig.js';
const uploadBanner = getUpload("banner")
import { getallbanner } from "../controller/banner.controller.js"
import { deletebanner } from "../controller/banner.controller.js"
import { getbannerbyid } from "../controller/banner.controller.js"
import { updateBanner } from "../controller/banner.controller.js"
const uploadUpdateBanner = getUpload("banner")


router.post("/create-banner", authMiddleware, uploadBanner.single("image") , asyncWrap(createbanner) )
router.get("/getallbanner",  asyncWrap(getallbanner))
router.delete("/deletebanner/:id", authMiddleware, asyncWrap(deletebanner))
router.get("/get-banner/:id", authMiddleware, asyncWrap(getbannerbyid))
router.put("/update-banner/:id", authMiddleware, uploadUpdateBanner.single("image"), asyncWrap(updateBanner));


export default router;