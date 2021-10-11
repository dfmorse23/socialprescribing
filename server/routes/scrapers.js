const express = require("express");
const eventBriteScraper = require("../scrapers/eventbriteScraper");
const volunteerScraper = require("../scrapers/volunteerScraper");
const { convertZipcode } = require("../scrapers/zipcodeConverter");
const router = express.Router();

router.post("/getEvents/:zipcode", (req, res) => {
	let zipcode = req.params.zipcode;

	// Temporarily hardcode Cleveland data
	const intZipcode = parseInt(zipcode);
	if (intZipcode >= 44101 && intZipcode <= 44199) {
		console.log("Queried Cleveland zipcode");

		let data = require("../mock_data.json");
		return res.json(data);
	}

	const eventBriteData = new Promise((resolve, reject) => {
		eventBriteScraper
			.getEvents(zipcode)
			.then((events) => resolve(events))
			.catch((err) => reject(err));
	});

	const volunteermatchData = new Promise((resolve, reject) => {
		volunteerScraper
			.getEvents(zipcode)
			.then((events) => resolve(events))
			.catch((err) => reject(err));
	});

	const genericLinks = new Promise((resolve, reject) => {
		let genericData = require("../generic_links.json");

		convertZipcode(zipcode)
			.then((zipcodeInfo) => {
				let dataWithLocations = [];

				// Add zipcode to urls & set location
				for (let i = 0; i < genericData.length; i++) {
					genericData[i]["url"] = genericData[i]["url"].concat(`${zipcode}`);
					genericData[i]["location"] = {
						city: zipcodeInfo["city"],
						country: zipcodeInfo["country"],
						postalCode: zipcode,
						region: zipcodeInfo["state"],
						virtual: false,
					};
					dataWithLocations.push(genericData[i]);
				}
				resolve({ Generic: dataWithLocations });
			})
			.catch((err) => reject(err));
	});

	Promise.all([eventBriteData, volunteermatchData, genericLinks])
		.then((vals) => {
			return res.json(vals);
		})
		.catch((err) => {
			return res.status(400).json({ error: `${err}` });
		});
});

module.exports = router;
