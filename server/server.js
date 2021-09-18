const express = require("express");
const bodyParser = require("body-parser");

// Routes
const scraper = require("./routes/scrapers.js");

const app = express();

app.use("/api/scrapers", scraper);

app.get("/", (req, res) => {
	return res.json({ response: "Hello World" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
