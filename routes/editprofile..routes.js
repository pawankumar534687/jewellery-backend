import express from 'express'
const router = express.Router()
import { edit } from '../controller/editprofile.controller.js'
import asyncWrap from '../utils/AsyncWrap.js';
import {saveprofile} from "../controller/editprofile.controller.js"

router.get("/editprofile/:id",  asyncWrap(edit))
router.put("/saveprofile/:id",  asyncWrap(saveprofile))

export default router;