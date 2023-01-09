const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");


const session = require("express-session");

const app = express();
const { redisClient, RedisStore } = require("./libs/redis");

// middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
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
