require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 60 // limit each IP to 100 requests per windowMs
})
const Route = require('./routes/routes')

app.use(limiter)
app.set('trust proxy', 1)


app.use(morgan('dev'))

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(express.static(__dirname + '/public'))

app.use('/api/v1', Route)
 
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))