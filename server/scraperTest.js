const axios = require("axios");
const cheerio = require("cheerio");

const getEmergencyFood = async (zipcode) => {
	try {
		// FindHelp has bot detection. Maybe retry with Puppeteer or other headless browsers?
		const soup = await axios.get(
			`https://www.findhelp.org/food/emergency-food?postal=${zipcode}`
		);
		const $ = cheerio.load(soup);
		const resultTitles = [];
		const resultDescriptions = [];

		$("a.activity-log").each((_idx, el) => {
			const resultTitle = $(el).text();
			resultTitles.push(resultTitle);
		});

		return [resultTitles, resultDescriptions];
	} catch (err) {
		return err;
	}
};

getEmergencyFood("94103").then((data) => console.log(data));
