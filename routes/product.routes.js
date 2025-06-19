import express from 'express'
import multer from "multer";
const router = express.Router();
// import {createproduct} from "../controller/createproduct.controller.js";
import asyncWrap from '../utils/AsyncWrap.js';
import {storage} from "../cloudconfig.js"
const upload = multer({ storage })
import { insertdata } from '../controller/product.controller.js';
import { alldata } from '../controller/product.controller.js';
import { detaildProduct } from '../controller/product.controller.js';

// router.post("/createproduct", upload.array("images", 5), asyncWrap(createproduct ))
router.post("/insertdata", asyncWrap(insertdata))
router.get("/alldata", asyncWrap(alldata))
router.get("/detaildProduct/:id", asyncWrap(detaildProduct))

export default router;
