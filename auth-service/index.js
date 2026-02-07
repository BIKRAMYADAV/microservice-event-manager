const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const connectDB = require("./config/db")
const AUTHPORT = process.env.AUTHPORT

app.use(express.json());

//mongodb connection
connectDB();

app.use("/auth", require("./routes/authRoutes"))

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "auth-service",
    uptime: process.uptime(),
  });
});

app.listen(AUTHPORT, () => {
    console.log(`The auth service is running on port ${AUTHPORT}`)
})