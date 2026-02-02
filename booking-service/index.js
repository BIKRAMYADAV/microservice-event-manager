const dotenv = require('dotenv')
dotenv.config()
const BOOKINGPORT = process.env.BOOKINGPORT

const express = require('express')
const app = express()

spp.use(express.json())
app.use("/bookings", require("./routes/bookingRoutes"))

app.listen(BOOKINGPORT, () => {
    console.log(`The booking service is listening on port ${PORT}`)
})

