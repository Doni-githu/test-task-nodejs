require('dotenv').config()
const express = require('express')
const redisClient = require('./redis')
const db = require('./config')

const UserRouter = require('./routes/user')
const app = express()
const compression = require('compression')


app.use(express.json())
app.use(compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false
        }

        return compression.filter(req, res)
    }
}))
app.use('/api/user', UserRouter)

function Run() {
    const port = process.env.PORT || 8000
    db.connect((error) => {
        if (error) {
            throw error
        }
        console.log('Connected to Postgresql!')
    })
    redisClient.connect()
        .then(() => {
            console.log("Connected to Redis")
        })
    app.listen(port, () => {
        console.log(`Server running port ${port}`)
    })
}
Run()