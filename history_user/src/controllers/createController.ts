import db from "../config"
import { CreateHistory } from "../types"
import HistorySchema from "../schemas/history"
import { Request, Response } from "express"
export default async function (req: Request, res: Response) {
    const body: CreateHistory = req.body
    const validationResult = HistorySchema.validate(body)
    if (validationResult.error) {
        console.log(validationResult.error)
        return res.status(400).json(validationResult.error.details)
    }
    const history = await db.query('INSERT INTO user_actions (user_id, action) VALUES ($1, $2)', [body.user_id, body.action])
    res.status(200).json(history.rows[0])
}