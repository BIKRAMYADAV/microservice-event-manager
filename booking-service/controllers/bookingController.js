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

exports.confirmBooking = async (req, res) => {
    try{
        const {bookingId} = req.body;
        const userId = req.user.id;
        const booking = await Booking.findById(bookingId)
        if(!booking){
            return res.status(400).json({
                message: "Booking not found"
            })
        }
        if(booking.userId.toString() !== userId){
            return res.status(400).json({
                message: "not your booking"
            })
        }
        if(booking.status !== "PENDING"){
            return res.status(400).json({
                message: "already processed"
            })
        }

        //implement payment
      

        await axios.post(`${SEATAPI}/seats/confirm`, {
            eventId: booking.eventId,
            seatNumber: booking.seatNumber 
        })
        booking.status = "CONFIRMED";
        await booking.save();

        res.json({
            message: "Booking confirmed",
            bookingId
        })
    } catch (err){
        console.log('server error in confirming booking')
        return res.status(500).json({
            message: "server error while confirming"
        })
    }
}

exports.cancelBooking = async (req, res) => {
    try {
        const {bookingId} = req.body;
        const userId = req.user.id 
        const booking = await Booking.findById(bookingId)
        if(!booking){
            res.status(400).json({
                message: 'booking does not exist'
            })
        }
        if(booking.userId.toString() !== userId){
            return res.status(400).json({
                message: "not your booking"
            })
        }
        if(booking.status !== "PENDING"){
            return res.status(400).json({
                message: "booking cannot be cancellerd"
            })
        }
        await axios.post(`${SEATAPI}/seats/release`, {
            eventId: booking.eventId,
            seatNumber: booking.seatNumber
        })
        booking.status = "CANCELLED"
        await booking.save()
        res.json({
            message: "Booking cancelled"
        })
    } catch (error){
        console.log('server error while cancelling booking')
        return res.status(500).json({
            message: "booking cannot be cancelled"
        })
    }
}