const express = require('express')
const router = express.Router()
const axios = require('axios')
const verifyJwt = require('../middlewares/jwt')

const seatApiUrl = "http://seat-service:3003"

router.post("/lock", async (req, res) => {
    console.log('lock api is hit')
    try{
        console.log('request body is', req.body);
        console.log(req.user)
        const response = await axios.post(seatApiUrl+"/seat/lock",
            req.body, {
                headers:{
                     "x-user-id": req.user.id,
      "x-user-role": req.user.role
                }
            }
        );
        // console.log('the response is ', response)
        res.status(response.status).json(response.data);
    } catch (error){
        console.log('There was an error at seat gateway')
        res.status(500);
    }
})

router.post("/create", async (req, res) => {

   try{
       
        const {eventId, seatNumber} = req.body;
        const response = await axios.post(seatApiUrl+"/seat/create", {
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
router.post("/bulk-create", async (req, res) => {
    try {
        const response = await axios.post(seatApiUrl+"/seat/bulk-create", req.body);
        res.status(response.status).json(response.data)
    } catch (error){
        console.log('There was an error while creating in bulk');
        res.status(500).json({
            message: 'There was an error while creating seats in bulk'
        })
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