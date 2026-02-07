const dotenv = require('dotenv')
dotenv.config()
const BOOKINGPORT = process.env.BOOKINGPORT
const connect = require('./config/db')

const express = require('express')
const app = express()

app.use(express.json())
app.use("/bookings", require("./routes/bookingRoutes"))

connect()
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "booking-service",
    uptime: process.uptime(),
  });
});


app.listen(BOOKINGPORT, () => {
    console.log(`The booking service is listening on port ${BOOKINGPORT}`)
})

