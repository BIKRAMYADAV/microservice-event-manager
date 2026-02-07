const express = require("express")
const dotenv = require('dotenv')
dotenv.config()
const SEATPORT = process.env.SEATPORT
const app = express()
const seatRoute = require('./routes/seatRoute')
const connect = require('./config/mongo')


app.use(express.json())
app.use("/seat",seatRoute);

//mongo connection
connect()
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "seat-service",
    uptime: process.uptime(),
  });
});


app.listen(SEATPORT, () => {
    console.log(`The Seat service is running on port ${SEATPORT}`);
})