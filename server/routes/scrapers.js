const express = require("express");
const eventBriteScraper = require("../scrapers/eventbriteScraper");
const volunteerScraper = require("../scrapers/volunteerScraper");
const router = express.Router();

router.post("/getEvents/:zipcode", (req, res) => {
	// Temporarily hardcode Cleveland data
	const intZipcode = parseInt(req.params.zipcode);
	if (intZipcode >= 44101 && intZipcode <= 44199) {
		console.log("Queried Cleveland zipcode");

		let data = require("../mock_data.json");
		return res.json(data);
	}

	const eventBriteData = new Promise((resolve, reject) => {
		eventBriteScraper
			.getEvents(req.params.zipcode)
			.then((events) => resolve(events))
			.catch((err) => reject(err));
	});

	const volunteermatchData = new Promise((resolve, reject) => {
		volunteerScraper
			.getEvents(req.params.zipcode)
			.then((events) => resolve(events))
			.catch((err) => reject(err));
	});

	Promise.all([eventBriteData, volunteermatchData])
		.then((vals) => {
			return res.json(vals);
		})
		.catch((err) => {
			return res.status(400).json({ error: `${err}` });
		});
});

module.exports = router;
