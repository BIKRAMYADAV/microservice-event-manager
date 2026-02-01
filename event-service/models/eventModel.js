const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
       description: {
        type: String,
    },
    date:{
        type: Date
    },
    time: {
        type: String
    }
    ,
    venue : {
        type: String,
        required: true 
    },
    totalSeats: {
        type: Number,
        required: true 
    },
    price: {
        type: Number
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Event', eventSchema)