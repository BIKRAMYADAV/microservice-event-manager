const mongoose = require("mongoose")

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("event db connected")
    } catch (error){
        console.log('there was an error while connecting to the db in event')
    }
}

module.exports = connect;