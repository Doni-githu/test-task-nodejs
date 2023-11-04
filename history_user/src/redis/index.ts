import * as redis from "redis"

const client = redis.createClient({
    url: process.env.REDIS_URI
})

export default client