const UserSchema = require('../schemas/user')
const addToHistory = require("../utils/addToHistory")
const db = require('../config')
module.exports = async function (req, res) {
    await db.connect()
    const body = req.body
    const validateResult = UserSchema.validate(body)
    if (validateResult.error) {
        return res.status(400).json(validateResult.error.details.map(item => ({
            message: item.message
        })))
    }
    try {
        await db.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email', [body.username, body.password, body.email])
        const postData = {
            action: 'create',
            user_id: result.rows[0].id
        }
        await addToHistory(postData)
        res.status(200).json(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Something went to wrong'
        })
    } 
}