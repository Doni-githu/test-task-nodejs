import { Router } from "express";
import db from "../config";
import redisClient from "../redis"
import { CreateHistory, Query } from "../types";
import HistorySchema from "../schemas/history"
import { REDIS_KEYS } from "../enum";
import getAllController from "../controllers/getAllController";
import createController from "../controllers/createController";

const router = Router()

router.get('/all', getAllController)

router.post('/create', createController)

export default router