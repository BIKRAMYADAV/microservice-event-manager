const rateLimit = require('express-rate-limit')
const redis = require('../config/redis')
const RedisStore = require('rate-limit-redis')

//the limiter is set to 100 requests per 15 minutes(windoMs) per IP
const limiter = rateLimit({
    windowMs: 15*60*1000,
    max:100,//max requrests per ip
    standardHeaders: true,
    store: new RedisStore({
        sendCommand : (...args) => redis.call(...args)
    })

})

module.exports = limiter