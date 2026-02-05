const mongoose = require('mongoose')

const SeatSchema = new mongoose.Schema({
     eventId: {
        type: String,
        unique: true
     },
  seatNumber:{
    type: Number,
    unique: true
  },
  status:{
    type: String,
    enum:"locked" || "unlocked"
  },
  lockedBy:{
    type: String
  },
  lockExpiresAt:{
    type: String,
    format: Date
  }
})

module.exports = mongoose.model('Seat', SeatSchema)