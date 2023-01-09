const session = require("express-session");
const connectRedis = require("connect-redis");
const redis = require("redis");

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

module.exports = {
  redisClient,
  RedisStore,
}