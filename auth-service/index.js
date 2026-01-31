const express = require('express')
const app = express()
const connectDB = require("./config/db")
const AUTHPORT = process.env.AUTHPORT

app.use(express.json());

//mongodb connection
connectDB();

app.use("/auth", require("./routes/authRoutes"))

app.listen(AUTHPORT, () => {
    console.log(`The auth service is running on port ${AUTHPORT}`)
})