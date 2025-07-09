import express from "express"
import asyncWrap from "../utils/AsyncWrap.js"
import { createcategory, getcategorybyid } from "../controller/category.controller.js"
import { getcategory } from "../controller/category.controller.js"
import {deletecategory} from "../controller/category.controller.js"
import { editcategory } from "../controller/category.controller.js"
import authMiddleware from "../middlewares/verifyToken.js"
import adminMiddleware from "../middlewares/adminVerify.js"

const router = express.Router()


router.post("/create-category", authMiddleware,  asyncWrap(createcategory))
router.get("/get-category", authMiddleware,  asyncWrap(getcategory))
router.delete("/delete-category/:id", authMiddleware,  asyncWrap(deletecategory))
router.get("/edit-category-form/:id", authMiddleware,  asyncWrap(getcategorybyid))
router.put("/edit-category/:id", authMiddleware, asyncWrap(editcategory))

export default router