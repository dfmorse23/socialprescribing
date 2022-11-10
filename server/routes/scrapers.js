const express = require("express");
const { getCategories } = require("../scrapers/eventbriteScraper");
const { getVolunteering } = require("../scrapers/volunteerScraper");
const { getGenericLinks } = require("../scrapers/genericLinks");
const router = express.Router();

router.post("/getEvents/:zipcode", (req, res) => {
	let zipcode = req.params.zipcode;

	// Return genericLinks data is Cleveland zipcode is queried
	const intZipcode = parseInt(zipcode);
	if (intZipcode >= 44101 && intZipcode <= 44199) {
		console.log("Queried Cleveland zipcode");

		let data = require("../mock_data.json");
		return res.json(data);
	}

	// Run scrapers
	const eventBriteData = new Promise((resolve, reject) => {
		getCategories(zipcode, [
			"health",
			"music",
			"charity",
			"community",
			"family",
			"hobbies",
			"home",
			"spirituality",
			"school",
			"sports",
			"travel",
		])
			.then((events) => resolve(events))
			.catch((err) => reject(err));
	});

	const volunteermatchData = new Promise((resolve, reject) => {
		getVolunteering(zipcode)
			.then((events) => resolve(events))
			.catch((err) => reject(err));
	});

	const genericLinks = new Promise((resolve, reject) => {
		getGenericLinks(zipcode)
			.then((links) => resolve(links))
			.catch((err) => reject(err));
	});

	// Return scraper data
	Promise.all([eventBriteData, volunteermatchData, genericLinks])
		.then((vals) => {
			return res.json(vals);
		})
		.catch((err) => {
			return res.status(400).json({ error: `${err}` });
		});
});

module.exports = router;
