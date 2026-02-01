//add an event, get all events, get one event
const Event = require('../models/eventModel')
exports.addEvent = async (req, res) => {
    try{
        const {
            title, description, date, time, venue,
            totalSeats, price
        } = req.body 
        const event = await Event.create({
             title, description, date, time, venue,
            totalSeats, price
        })
        res.status(201).json({
            message: "new event added successfully"
        })
    } catch (error) {
        console.log('There was an error while adding the event')
        res.status(500).json({
            message: "server error while adding event"
        })
    }
}

exports.allEvents = async (req, res) => {
    try{
        const events = await Event.find({});
        res.status(201).json({
            message: "all events retrieved",
            events
        })
    } catch (error){
          console.log('There was an error while getting all event')
        res.status(500).json({
            message: "server error while getting all events"
        })
    }
}

exports.oneEvent = async (req, res) => {
    try{
        const event = await Event.findOne({
            _id: req.params.id 
        })
        if(!event){
            res.status(400).json({
                message: 'The event does not exist'
            })
        }
        res.status(201).json({
            message: "event retrieved",
            event
        })
    } catch (error){
          console.log('There was an error while getting one event')
        res.status(500).json({
            message: "server error while gettingg event"
        })
    }
}