const Seat = require('../models/Seat')


exports.lockSeat = async (req, res) => {
    const {eventId, seatNumber} = req.body;
    const userId = req.user.id;

    const lockKey = `LOCK:${eventId}:${seatNumber}`
    //each seat has it's own lock

    //(keyname, value stored) => (seat, owner)
    const locked = await redis.set(lockKey, userId, "NX", "EX", 600)
    //NX -> set if key does not exist, EX -> auto expire after 600 seconds
    if(!locked){
        return res.status(400).json({
            message: "seat is locked"
        })
    }

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

if(!seat){
    await redis.del(lockKey);//the redis need to be rollbackked
    return res.status(400).json({
        message: 'seat cannot be locked'
    })
}
res.status(200).json({
    message: 'seat locked',
    seat
})
}

exports.getSeat = async (req, res) => {
    const eventId = req.params.eventId;
    const seatNumber = req.params.seatNumber 
    const seat = Seat.findOne({
        eventId, seatNumber
    })
    if(!seat){
        return res.status(400).json({
            message: "AVAILABLE"
        })
    }
    return res.status(201).return(seat)
}

exports.confirmSeat = async (req, res) => {
 try {
    const { eventId, seatNumber } = req.body;
    const userId = req.user.id;

    const seat = await Seat.findOneAndUpdate(
      {
        eventId,
        seatNumber,
        status: "LOCKED",
        lockedBy: userId,
      },
      {
        $set: {
          status: "BOOKED",
          lockedBy: null,
          lockExpiresAt: null,
        },
      },
      { new: true }//replaces with new one
    );

    if (!seat) {
      return res
        .status(400)
        .json({ message: "Seat cannot be confirmed" });
    }

    res.json({ message: "Seat booked", seat });
  } catch (err) {
    console.error("Confirm seat error:", err);
    res.status(500).json({ message: "Failed to confirm seat" });
  }
}

exports.releaseSeat = async (req, res) => {
 try {
    const { eventId, seatNumber } = req.body;
    const userId = req.user.id;

    const seat = await Seat.findOneAndUpdate(
      {
        eventId,
        seatNumber,
        status: "LOCKED",
        lockedBy: userId,
      },
      {
        $set: {
          status: "AVAILABLE",
          lockedBy: null,
          lockExpiresAt: null,
        },
      },
      { new: true }
    );

    if (!seat) {
      return res
        .status(400)
        .json({ message: "Seat cannot be released" });
    }

    res.json({ message: "Seat released", seat });
  } catch (err) {
    console.error("Release seat error:", err);
    res.status(500).json({ message: "Failed to release seat" });
  }
}