const express = require('express')
const dotenv = require('dotenv')
const authProxy = require('./routes/authProxy')
dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json());

app.use("/api/auth", authProxy);


app.listen(PORT, () => {
    console.log(`The gateway server is listening on port ${PORT}`);
})