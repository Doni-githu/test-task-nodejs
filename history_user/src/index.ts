import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
import db from "./config"
import HistoryRouter from "./routes/history"
import compression from "compression"
import redisClient from "./redis"

const app = express()



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
app.use(express.json())
app.use('/api/history', HistoryRouter)


function Run() {
    const port = process.env.PORT || 8080
    db.connect((error) => {
        if (error) {
            throw error
        }
        console.log('Connected to Postgresql!')
    })
    redisClient.connect()
        .then(() => {
            console.log("Connected to Redis!")
        })
    app.listen(port, () => {
        console.log(`Server running port ${port}`)
    })
}
Run()