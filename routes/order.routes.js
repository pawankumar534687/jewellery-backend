import asyncWrap from '../utils/AsyncWrap.js';
import { newOrder } from "../controller/order.controller.js";
import express from "express"
import authMiddleware from '../middlewares/verifyToken.js';
import { getallorders } from '../controller/order.controller.js';
import { deleteorder } from '../controller/order.controller.js';
import { orderdetails } from '../controller/order.controller.js';
import { updateorder } from '../controller/order.controller.js'; 
import { getorderbyId } from '../controller/order.controller.js';
import { orderbyid } from '../controller/order.controller.js';
const router = express.Router()


router.post("/new-order", authMiddleware, asyncWrap(newOrder))
router.get("/get-all-orders", authMiddleware, asyncWrap(getallorders))
router.delete("/delete-order/:id", authMiddleware, asyncWrap(deleteorder))
router.get("/order-details/:id", authMiddleware, asyncWrap(orderdetails))
router.put("/update-order/:id", authMiddleware, asyncWrap(updateorder))
router.get("/getorderbyId/:id", authMiddleware, asyncWrap(getorderbyId))
router.get("/orderbyid/:id", authMiddleware, asyncWrap(orderbyid))


export default router;