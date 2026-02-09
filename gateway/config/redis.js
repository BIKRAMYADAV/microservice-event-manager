const Redis = require('ioredis')
const redis = new Redis({
    host: "redis",
    port: 6379
})

redis.on("connect", () => {
    console.log("gateway Redis connected");
})

redis.on("error", () => {
    console.log("error on gateway redis");
})

module.exports = redis