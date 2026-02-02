const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
     userId: {
        type: String
     },
     eventId: {
        type: String 
     },
     seatNumber: {
        type: Number 
     },
     status: {
        type: String,
        enum: "PENDING" || "CONFIRMED" || "CANCELLED"
     }
}, {
    timestamps: true 
})

module.exports = mongoose.model("Booking",BookingSchema)