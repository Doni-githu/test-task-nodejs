import express from "express"
import client from "./config"
import HistoryRouter from "./routes/history"
import * as dotenv from "dotenv"
dotenv.config()
const app = express()



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