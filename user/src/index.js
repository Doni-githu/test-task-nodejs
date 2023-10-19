require('dotenv').config()
const express = require('express')
const client = require('./config')
const UserRouter = require('./routes/user')
const app = express()


app.use(express.json())
app.use('/api/user', UserRouter)

function Run() {
    const port = process.env.PORT || 8000
    client.connect((error) => {
        if(error) {
            throw error
        }
        console.log('Connected!')
    })
    app.listen(port, () => {
        console.log(`Server running port ${port}`)
    })
}
Run()