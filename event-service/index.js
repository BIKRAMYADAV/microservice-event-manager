const EVENTPORT = process.env.EVENTPORT
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.listen(EVENTPORT, () => {
    console.log(`The event-service is listening on port ${EVENTPORT}`)
})