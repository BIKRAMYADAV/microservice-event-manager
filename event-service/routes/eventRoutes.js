const express = require('express')
const router = express.Router()
const eventController = require('../controller/eventController')

//add an event, all events amd one event
router.post("/add", eventController.addEvent)
router.get("/events", eventController.allEvents)
router.get("/events/:id", eventController.oneEvent)

module.exports = router