import express from 'express'
const router = express.Router();
import { createproduct } from '../controller/product.controller.js';
import asyncWrap from '../utils/AsyncWrap.js';
import getUpload from '../cloudconfig.js';
const uploadProduct = getUpload("products")
import { insertdata } from '../controller/product.controller.js';
import { alldata } from '../controller/product.controller.js';
import { detaildProduct } from '../controller/product.controller.js';
import authMiddleware from '../middlewares/verifyToken.js';
import { findbysubcategory } from '../controller/product.controller.js';
import {getallproduct} from '../controller/product.controller.js'
import { deleteproduct} from '../controller/product.controller.js';
import { editproduct } from '../controller/product.controller.js';

router.post("/create-product", authMiddleware, uploadProduct.array("images", 5), asyncWrap(createproduct ))
router.post("/insertdata", authMiddleware, authMiddleware, asyncWrap(insertdata))
router.get("/alldata",  asyncWrap(alldata))
router.get("/detaildProduct/:id", authMiddleware, asyncWrap(detaildProduct))
router.get("/jewellery/:subcategory", asyncWrap(findbysubcategory))
router.get("/get-all-product", authMiddleware, asyncWrap(getallproduct))
router.delete("/delete-product/:id", authMiddleware, asyncWrap(deleteproduct))


router.put(
  "/edit-product/:id",
  uploadProduct.array("images", 5),       
  asyncWrap(editproduct)
);


export default router;
