const express = require('express')
const dotenv = require('dotenv')
const connect = require('./config/db')
dotenv.config()
const EVENTPORT = process.env.EVENTPORT

const app = express()

app.use(express.json())
app.use("/events", require("./routes/eventRoutes"))

//for database connection
connect()

app.listen(EVENTPORT, () => {
    console.log(`The event-service is listening on port ${EVENTPORT}`)
})