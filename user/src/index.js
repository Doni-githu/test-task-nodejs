require('dotenv').config()
const express = require('express')
const client = require('./config')
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