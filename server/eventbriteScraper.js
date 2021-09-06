const axios = require("axios");
const cheerio = require("cheerio");

const getEvents = async (zipcode) => {
	try {
		// TODO: Fix hardcoded url, ie 'ca--san-francisco'
		const url = `https://www.eventbrite.com/d/ca--san-francisco/${zipcode}/`;
		const { data } = await axios.get(url);
		const $ = cheerio.load(data);
		const eventTitles = [];
		const eventTimes = [];
		const eventLocations = [];

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
		$("div.eds-evet-card-content__sub-title").each((i, el) => {
			if (i % 2 == 1) {
				const time = $(el).text();
				eventTimes.push(time);
			}
		});

		// Get locations & prices
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

		const info = {};
		for (let i = 0; i < eventTitles.length; i++) {
			info[`${eventTitles[i]}`] = {
				time: eventTimes[i],
				location: eventLocations[i],
			};
		}

		return [info];
	} catch (err) {
		return err;
	}
};

getEvents(94103).then((data) => console.log(data));
