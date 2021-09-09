const express = require("express");
const eventBriteScraper = require("./eventbriteScraper");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});

app.post("/api/getEvents/:zipcode", (req, res) => {
	eventBriteScraper.getEvents(req.params.zipcode).then((events) => {
		return res.json(events);
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
