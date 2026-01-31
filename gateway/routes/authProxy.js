const express = require('express')
const router = express.Router();
const axios = require('axios');
const authServiceUrl = "http://localhost:3001"

router.post("/register", async (req, res) => {
    try{
        const response = await axios.post(authServiceUrl+"/auth/register", req.body)
        res.status(response.status).json(response.data);
    } catch (error){
        console.log(`There was an error at register gateway`);
        res.json(500).json({
            message: 'There was a server error at gateway'
        })
    }
})

router.post("/login", async (req, res) => {
    try{
        const response = await axios.post(authServiceUrl+"/auth/login", req.body)
        res.status(response.status).json(response.data);
    } catch (error){
        console.log(`There was an error at login gateway`);
        res.json(500).json({
            message: 'There was a server error at gateway'
        })
    }
})

router.get("/verify", async (req, res) => {
    try{
        const response = await axios.post(authServiceUrl+"/auth/verify", {
            headers:{
                Authorization: req.headers.authorization
            } 
        })
        res.status(response.status).json(response.data);
    } catch (error){
        console.log(`There was an error at register gateway`);
        res.json(500).json({
            message: 'There was a server error at gateway'
        })
    }
})

module.exports = router