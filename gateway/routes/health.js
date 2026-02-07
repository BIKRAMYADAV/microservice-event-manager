const axios = require('axios')
const express = require('express')
const router = express.Router()



const services = {
    auth: "http://localhost:3001/health",
    booking: "http://localhost:3004/health",
    event: "http://localhost:3002/health",
    seat: "http://localhost:3003/health"
}

const checkService = async (name, url) => {
    try{
        const response = await axios.get(url, {timeout:2000})
        return {
            status: "up",
            responseTime: response.headers["x-response-time"] || null
        }
    } catch (error){
        return {
            status: "down",
            error: error.message
        }
    }
}

router.get("/", async (req, res) => {
    const health = {
        gateway: {
            status: "up",
            uptime: process.uptime()
        },
        services: {}
    }

    const checks = Object.entries(services).map(
        async ([name, url]) => {
            health.services[name] = await checkService(name, url)
        }
    )
    await Promise.all(checks)
    res.status(200).json(health)
})
module.exports = router