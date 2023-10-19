import { Router } from "express";
import client from "../config";
import { CreateHistory, Query } from "../types";
import HistorySchema from "../schemas/history"



const router = Router()


router.get('/all', async (req, res) => {
    let limit: number = req.query.limit ? Number(req.query.limit) : 100;
    const query: Query = {
        text: 'SELECT ua.id, u.id as user_id, u.username, ua.action, ua.timestamp FROM user_actions ua INNER JOIN users u ON ua.user_id = u.id',
        values: []
    };


    if (req.query.user_id && typeof(req.query.user_id) === "number") {
        query.text += ' WHERE u.id = $1';
        query.values.push(Number(req.query.user_id));
    }

    if (req.query.page) {
        const page = (Number(req.query.page) - 1) * limit;
        query.text += ` OFFSET $${query.values.length + 1}`;
        query.values.push(page);
    }
    query.text += ` LIMIT $${query.values.length + 1}`;
    query.values.push(limit);
    const data = await client.query(query)
    res.status(200).json(data.rows)
})

router.post('/create', async (req, res) => {
    const body:CreateHistory = req.body
    const validationResult = HistorySchema.validate(body)
    if(validationResult.error){
        return res.status(400).json(validationResult.error.details)
    }
    const history = await client.query('INSERT INTO user_actions (user_id, action) VALUES ($1, $2)', [body.user_id, body.action])
    res.status(200).json(history.rows)
})

export default router