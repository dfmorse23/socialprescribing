const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

// Routes
const scraper = require("./routes/scrapers.js");

const app = express();

app.use(cors());
app.use("/api/scrapers", scraper);
app.use(cors());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", ["*"]);
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});

app.get("/", (req, res) => {
	return res.json({ response: "Hello World" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
