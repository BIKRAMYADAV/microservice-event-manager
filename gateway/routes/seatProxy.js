const express = require('express')
const router = express.Router()
const axios = require('axios')

const seatApiUrl = "http://localhost:3003"

router.post("/lock", (req, res) => {
    try{
        const response = axios.post(seatApiUrl+"/seat/lock",
            req.body,
             {
        headers: {
          "x-user-id": req.user.id,
          "x-user-role": req.user.role
        }
      }
        );
        console.log('the response is ', response)
        res.status(response.status).json(response.data);
    } catch (error){
        console.log('There was an error at seat gateway', error)
        res.status(500);
    }
})

router.post("/create", (req, res) => {
   try{
        const {eventId, seatNumber} = req.body;
        const response = axios.post(seatApiUrl+"/seat/create", {
            eventId, seatNumber
        });
        console.log('the response is', response);
        res.status(response.status).json(
            response.data
        )
    } catch (error){
        console.log('There was an error at seat gateway')
        res.status(500);
    }
})

// router.post("/release", () => {
//    try{

//     } catch (error){
//         console.log('There was an error at seat gateway')
//         res.status(500);
//     }
// })

module.exports = router