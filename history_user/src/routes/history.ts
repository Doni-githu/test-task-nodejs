import { Router } from "express";
import client from "../config";

const router = Router()

router.get('/all', async (req, res) => {
    let limit = req.query.limit ? Number(req.query.limit) : 100
    const query = {
        text: 'SELECT ua.id, u.id as user_id, u.username, ua.action, ua.timestamp FROM user_actions ua INNER JOIN users u ON ua.user_id = u.id',
    }

    if (req.query.user_id) {
        query.text += ` WHERE u.id = ${req.query.user_id}`
    }

    if (req.query.page) {
        const page = (Number(req.query.page) - 1) * limit
        query.text += ` OFFSET ${page}`
    }
    query.text += ` LIMIT ${limit}`

    const data = await client.query(query)
    res.status(200).json(data.rows)
})

router.post('/create', async (req, res) => {
    const body = req.body
    const history = await client.query('INSERT INTO user_actions (user_id, action) VALUES ($1, $2)', [body.user_id, body.action])
    res.status(200).json(history.rows)
})

export default router