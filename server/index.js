const express = require("express");
const eventBriteScraper = require("./eventbriteScraper");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});

app.post("/api/getEvents/:zipcode", (req, res) => {
	const data = eventBriteScraper.getEvents(req.params.zipcode);
	console.log(data);
	return res.json(data);
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
