const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/bookingController')

router.post("/create", bookingController.createBooking)

router.post("/confirm", () => {

})

router.post("/cancel", () => {

})

module.exports = router