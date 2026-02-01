const express = require('express')
const seatController = require('../controllers/seatController')
const router = express.Router()

router.post("/lock", seatController.lockSeat);