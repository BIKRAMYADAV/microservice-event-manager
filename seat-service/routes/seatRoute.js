const express = require('express')
const seatController = require('../controllers/seatController')
const router = express.Router()

router.post("/lock", seatController.lockSeat);

router.get("/seat/:eventId/:seatNumber",seatController.getSeat);

router.post("/confirm", seatController.confirmSeat)
router.post("/release", seatController.releaseSeat)

router.post("/create", seatController.createSeat);

router.post("/bulk-create", seatController.bulkCreate);

module.exports = router