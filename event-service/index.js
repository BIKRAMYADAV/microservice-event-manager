const EVENTPORT = process.env.EVENTPORT
const express = require('express')
const dotenv = require('dotenv')
const connect = require('./config/db')
dotenv.config()

const app = express()

//for database connection
connect()

app.listen(EVENTPORT, () => {
    console.log(`The event-service is listening on port ${EVENTPORT}`)
})