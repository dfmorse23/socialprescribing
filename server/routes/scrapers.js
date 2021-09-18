const express = require("express");
const eventBriteScraper = require("../scrapers/eventbriteScraper");
const volunteerScraper = require("../scrapers/volunteerScraper");
const router = express.Router();

router.post("/getEvents/:zipcode", (req, res) => {
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

	Promise.all([eventBriteData, volunteermatchData]).then((vals) => {
		return res.json(vals);
	});
});

router.get("/", (req, res) => {
	return res.json({ response: "In scraper route" });
});

module.exports = router;
