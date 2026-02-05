const mongoose = require('mongoose')

const SeatSchema = new mongoose.Schema({
     eventId: {
        type: String,
        // unique: true
        index: true
     },
  seatNumber:{
    type: String,
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
SeatSchema.index(
  { eventId: 1, seatNumber: 1 },
  { unique: true }
);
module.exports = mongoose.model('Seat', SeatSchema)