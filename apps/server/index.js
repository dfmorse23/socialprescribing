const express = require("express");
var cors = require("cors");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const session = require("express-session");
const connectRedis = require("connect-redis");
const redis = require("redis");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
  });
  app.use(
    session({
      store:
        process.env.NODE_ENV === "production"
          ? new RedisStore({ client: redisClient })
          : null,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        secure: false,
        sameSite: "lax",
        resave: false,
      },
    })
  );
} else {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        secure: false,
        sameSite: "lax",
        resave: false,
      },
    })
  );
}

// Routes
const scraper = require("./routes/scrapers.js");
const database = require("./routes/database.js");
const auth = require("./routes/auth.js");
const favorites = require("./routes/favorites.js");

// LEGACY ROUTES
app.use("/api/scrapers", scraper);
app.use("/user", database);

const v2 = express.Router();
v2.use("/auth", auth);
v2.use("/favorites", favorites);

app.use("/v2", v2);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on ${PORT}`);
});
