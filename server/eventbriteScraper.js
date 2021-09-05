const axios = require("axios");
const cheerio = require("cheerio");

const getEvents = async (zipcode) => {
	try {
		const url = `https://www.eventbrite.com/d/ca--san-francisco/${zipcode}/`;
		const { data } = await axios.get(url);
		const $ = cheerio.load(data);
		const eventTitles = [];
		let counter = 0;

		$("div.eds-is-hidden-accessible").each((i, el) => {
			// EventBrite lists titles twice with this class. Only record every other title.
			if (counter % 2 == 1) {
				const title = $(el).text();
				eventTitles.push(title);
			}

			counter++;
		});

		return eventTitles;
	} catch (err) {
		return err;
	}
};

getEvents(94103).then((data) => console.log(data));
