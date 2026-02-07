const express = require('express')
const dotenv = require('dotenv')
const authProxy = require('./routes/authProxy')
const seatProxy = require('./routes/seatProxy')
const eventProxy = require('./routes/eventProxy')
const bookingProxy = require('./routes/bookingProxy')
const rateLimiter = require('./middlewares/rateLimiter')
const verifyJwt = require('./middlewares/jwt')

dotenv.config()

const PORT = process.env.PORT
const app = express()


app.use(express.json());

app.use(rateLimiter);//applied before routes

app.use("/api/auth", authProxy);
app.use("/api/seat",verifyJwt, seatProxy);
// app.use("/api/booking", bookingProxy);
// app.use("/api/event", eventProxy);


app.listen(PORT, () => {
    console.log(`The gateway server is listening on port ${PORT}`);
})