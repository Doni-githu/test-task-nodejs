const router = require('express').Router()
const client = require('../config')
const axios = require('axios')
const UserSchema = require('../schemas/user')

async function addToHistory(action, user_id) {
    try {
        await axios.post('http://localhost:8080/api/history/create', {
            user_id: user_id,
            action
        })
        return "success"
    } catch (error) {
        return "error"
    }
}

router.get('/all', async (req, res) => {
    const data = await client.query('SELECT * FROM users;')
    res.status(200).json(data.rows)
})


router.post('/create', async (req, res) => {
    const body = req.body
    const validateResult = UserSchema.validate(body)
    if (validateResult.error) {
        return res.status(400).json(validateResult.error.details.map(item => ({
            message: item.message
        })))
    }
    const result = await client.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email', [body.username, body.password, body.email])
    await addToHistory('create', result.rows[0].id)
    res.status(200).json(result.rows[0])
})

router.put('/update/:id', async (req, res) => {
    const body = req.body
    const oldUser = await client.query('SELECT * FROM users WHERE id=$1', [req.params.id])
    const result = await addToHistory("update", req.params.id)
    if (result === "success") {
        const updatedUser = await client.query(
            'UPDATE users SET username=$1, password=$2, email=$3 WHERE id=$4 RETURNING username,password,email',
            [
                body.username ? body.username : oldUser.rows[0].username,
                body.password ? body.password : oldUser.rows[0].password,
                body.email ? body.email : oldUser.rows[0].email,
                req.params.id
            ]
        )
        res.status(202).json(updatedUser.rows[0])
    }

    if (result === "error") {
        res.status(400).json({
            message: "Some thing went to wrong"
        })
    }

})

module.exports = router
