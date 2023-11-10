import { Query } from "../types";
import { Request, Response } from "express";
import db from "../config"

export default async function (req: Request, res: Response) {
    let limit: number = req.query.limit ? Number(req.query.limit) : 100;
    const query: Query = {
        text: 'SELECT ua.id, u.id as user_id, u.username, ua.action, ua.timestamp FROM user_actions ua INNER JOIN users u ON ua.user_id = u.id',
        values: []
    };


    if (req.query.user_id) {
        if (Number.isInteger(req.query.user_id)) {
            query.text += ' WHERE u.id = $1';
            query.values.push(Number(req.query.user_id));
        }
    }

    if (req.query.page) {
        const page = (Number(req.query.page) - 1) * limit;
        query.text += ` OFFSET $${query.values.length + 1}`;
        query.values.push(page);
    }
    query.text += ` LIMIT $${query.values.length + 1}`;
    query.values.push(limit);
    const data2 = await db.query(query)
    res.status(200).json(data2.rows)
}