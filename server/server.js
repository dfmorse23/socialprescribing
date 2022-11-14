const express = require("express");
var cors = require("cors");
const session = require("express-session");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Routes
const scraper = require("./routes/scrapers.js");
const database = require("./routes/database.js");
const auth = require("./routes/auth.js");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        secure: process.env.NODE_ENV === "production",
    }
}))

app.use("/api/scrapers", scraper);
app.use("/user", database);
app.use("/auth", auth);

// Set static folder
app.use(express.static("client/build"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
