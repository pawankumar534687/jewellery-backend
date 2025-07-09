import express from "express";
const router = express.Router();
import getUpload from "../cloudconfig.js";
import asyncWrap from "../utils/AsyncWrap.js";
const uploadSubCategory = getUpload("subcategory");
import {
  createsubcategory,
  getsubcategory,
  getformsubcategory,
  deletesubcategory,
  editsubcategory,
} from "../controller/subcategory.controller.js";
import authMiddleware from "../middlewares/verifyToken.js";



router.post("/create-sub-category", authMiddleware, uploadSubCategory.single("image"), asyncWrap(createsubcategory));
router.get("/get-sub-category", authMiddleware, asyncWrap(getsubcategory))
router.get("/get-sub-category-form/:id", authMiddleware, asyncWrap(getformsubcategory))
router.delete("/delete-subcategory/:id", authMiddleware, asyncWrap(deletesubcategory))
router.put("/edit-subcategory/:id", authMiddleware, uploadSubCategory.single("image"), asyncWrap(editsubcategory));





export default router