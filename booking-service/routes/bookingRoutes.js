const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/bookingController')

router.post("/create", bookingController.createBooking)

router.post("/confirm",bookingController.confirmBooking)

router.post("/cancel", bookingController.cancelBooking)

module.exports = router