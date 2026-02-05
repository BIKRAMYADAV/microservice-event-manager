const express = require('express')
const router = express.Router()
const axios = require('axios')

const seatApiUrl = "http://localhost:3003"

router.post("/lock", (req, res) => {
    try{
        const response = axios.post(seatApiUrl+"/lock");
        res.status(response.status).json(response.data);
    } catch (error){
        console.log('There was an error at seat gateway')
        res.status(500);
    }
})

// router.post("/confirm", () => {
//    try{

//     } catch (error){
//         console.log('There was an error at seat gateway')
//         res.status(500);
//     }
// })

// router.post("/release", () => {
//    try{

//     } catch (error){
//         console.log('There was an error at seat gateway')
//         res.status(500);
//     }
// })

module.exports = router