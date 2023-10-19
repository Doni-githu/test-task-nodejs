import express from "express"
import client from "./config"
import HistoryRouter from "./routes/history"
import * as dotenv from "dotenv"
import compression from "compression"
dotenv.config()
const app = express()



app.use(compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
        if(req.headers['x-no-compression']){
            return false
        }

        return compression.filter(req, res)
    }
}))
app.use(express.json())
app.use('/api/history', HistoryRouter)


function Run() {
    const port = process.env.PORT || 8080
    client.connect((error) => {
        if (error) {
            throw error
        }
        console.log('Connected!')
    })
    app.listen(port, () => {
        console.log(`Server running port ${port}`)
    })
}
Run()