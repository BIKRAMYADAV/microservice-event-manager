const express = require("express")
const dotenv = require('dotenv')
dotenv.config()
const SEATPORT = process.env.SEATPORT
const app = express()
const seatRoute = require('./routes/seatRoute')

app.use("/seat",seatRoute);

app.listen(SEATPORT, () => {
    console.log(`The Seat service is running on port ${SEATPORT}`);
})