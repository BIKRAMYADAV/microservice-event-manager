const axios = require('axios')
const Booking = require("../models/Booking")
const SEATAPI = ""

exports.createBooking = async (req, res) => {
    try{
        const {eventId, seatNumber} = req.body;
        const userId = req.user.id;

        const seatResponse = await axios.get(SEATAPI+`/seats/${eventId}/${seatNumber}`);
        const seat = seatResponse.data;

        if(seat.status !== "LOCKED"){
            return res.status(400).json({
                message: "seat is not locked" 
            })
        }
        const booking = await Booking.create({
            userId,
            eventId,
            seatNumber,
            status:"PENDING"
        })

        res.status(201).json({
            message: "booking created",
            bookingId: booking._id
        })


    } catch (error){
        console.log('There was an error in creating a booking')
        return res.status(500).json({
            message: "server error"
        })
    }
}