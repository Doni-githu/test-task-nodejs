const db = require('../config')
const addToHistory = require('../utils/addToHistory')
module.exports = async function (req, res) {
    const body = req.body
    try {
        await db.connect()
        const oldUser = await db.query('SELECT * FROM users WHERE id=$1', [req.params.id])
        await addToHistory("update", req.params.id)
        const updatedUser = await db.query(
            'UPDATE users SET username=$1, password=$2, email=$3 WHERE id=$4 RETURNING username,password,email',
            [
                body.username ? body.username : oldUser.rows[0].username,
                body.password ? body.password : oldUser.rows[0].password,
                body.email ? body.email : oldUser.rows[0].email,
                req.params.id
            ]
        )
        res.status(202).json(updatedUser.rows[0])
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Some thing went to wrong"
        })
    }
}