require("dotenv").config({ path: "../.env" });
const axios = require("axios");
const cheerio = require("cheerio");

const getEvents = async (zipcode) => {
	try {
		// Get city & state from zipcode api
		const { data } = await axios.get(
			`https://www.zipcodeapi.com/rest/${process.env.ZIPCODE_API_KEY}/info.json/${zipcode}/degrees`
		);
		const formattedCity = data["city"].replace(/\s/g, "-");

		// Submit city, state, and zipcode to EventBrite
		const eventBriteUrl = `https://www.eventbrite.com/d/${data["state"]}--${formattedCity}/${zipcode}/`;

		// If the zipcode api fails, comment out everything above and uncomment the below line
		// const eventBriteUrl = https://www.eventbrite.com/d/tx--dallas/75001

		const events = await axios.get(eventBriteUrl);
		const $ = cheerio.load(events["data"]);
		const eventTitles = [];
		const eventTimes = [];
		const eventLocations = [];
		const eventUrls = [];

		// Get titles
		$("div.eds-is-hidden-accessible").each((i, el) => {
			// EventBrite lists titles twice with this class. Only record every other title.
			if (i % 2 == 1) {
				const title = $(el).text();
				// Remove characters after pipe (usually contains extra description)
				eventTitles.push(title.split("|")[0]);
			}
		});

		// Get times
		// This may break if EventBrite ever fixes the typo in the class name...
		$("div.eds-evet-card-content__sub-title").each((i, el) => {
			if (i % 2 == 1) {
				const time = $(el).text();
				eventTimes.push(time);
			}
		});

		// Get locations
		$("div.eds-event-card-content__sub-content").each((i, el) => {
			if (i % 2 == 1) {
				// Locations
				$(el)
					.find("div > div.card-text--truncated__one")
					.each((i, el) => {
						const location = $(el).text();
						eventLocations.push(location);
					});
			}
		});

		// Get URLs
		$("div.eds-event-card-content__primary-content > a").each((i, el) => {
			if (i % 2 == 1) {
				const url = $(el).attr("href");
				eventUrls.push(url);
			}
		});

		const info = {};
		for (let i = 0; i < eventTitles.length; i++) {
			info[`${eventTitles[i]}`] = {
				time: eventTimes[i],
				location: eventLocations[i],
				url: eventUrls[i],
			};
		}

		return [info];
	} catch (err) {
		// Should also return error code when implemented with Express
		return err;
	}
};

getEvents(94103).then((data) => console.log(data));
