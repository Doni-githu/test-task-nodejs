const db = require('../config')
module.exports = async function (req, res) {
    try {
        await db.connect()
        const data2 = await db.query('SELECT * FROM users;')
        res.status(200).json(data2.rows)
    } catch (error) {
        res.status(400).json({
            message: 'Something went to wrong'
        })
    }
}