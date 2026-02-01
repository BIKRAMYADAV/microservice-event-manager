const mongoose = require('mongoose')

const SeatSchema = new mongoose.Schema({
     eventId: {
        type: String
     },
  seatNumber:{
    type: Number
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