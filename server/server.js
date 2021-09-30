const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

// Routes
const scraper = require("./routes/scrapers.js");
const database = require("./routes/database.js");

const app = express();

app.use(cors());
app.use("/api/scrapers", scraper);
app.use("/user", database);

app.get("/", (req, res) => {
    return res.json({ response: "Hello World" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
