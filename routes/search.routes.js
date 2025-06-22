import express from 'express';
const router = express.Router()
import { search } from '../controller/search.controller.js';
import asyncWrap from '../utils/AsyncWrap.js';


router.get("/search", asyncWrap(search))

export default router;