const Seat = require('../models/Seat')
exports.lockSeat = async (req, res) => {
    const userId = req.user.id;
    const now = new Date();
    const seat = await Seat.findOneAndUpdate({
        eventId,
        seatNumber,
        $or: [
            {status:"AVAILABLE"},
            {status:"LOCKED", lockExpiresAt: {$lt: now}}//less than now, then proceed
        ]
    },
{
    $set:{
        status:'LOCKED',
        lockedBy: userId
        ,lockExpiresAt: new Date(now.getTime()+10*60*1000)
    }
}
, {
    new:true//returns the updated one
}
)
}