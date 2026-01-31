const express = require('express')
const app = express()

const AUTHPORT = process.env.AUTHPORT

app.use(express.json());

app.use("/auth", require("./routes/authRoutes"))

app.listen(AUTHPORT, () => {
    console.log(`The auth service is running on port ${AUTHPORT}`)
})