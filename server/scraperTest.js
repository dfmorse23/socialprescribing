const axios = require("axios");
const puppeteer = require("puppeteer");
// const cheerio = require("cheerio");

// ---Puppeteer scraper---
const getEmergencyFood = async (zipcode) => {
	try {
		const url = `https://www.findhelp.org/food/emergency-food?postal=${zipcode}`;
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		await page.setJavaScriptEnabled(true);

		await page.goto(url);

		const pageHTML = await page.evaluate(
			"new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML"
		);

		await browser.close();

		return pageHTML;
	} catch (err) {
		return err;
	}
};

// ---Cheerio scraper---
// const getEmergencyFood = async (zipcode) => {
// 	try {
// 		// FindHelp has bot detection. Maybe retry with Puppeteer or other headless browsers?
// 		const soup = await axios.get(
// 			`https://www.findhelp.org/food/emergency-food?postal=${zipcode}`
// 		);
// 		const $ = cheerio.load(soup);
// 		const resultTitles = [];
// 		const resultDescriptions = [];

// 		$("a.activity-log").each((_idx, el) => {
// 			const resultTitle = $(el).text();
// 			resultTitles.push(resultTitle);
// 		});

// 		return [resultTitles, resultDescriptions];
// 	} catch (err) {
// 		return err;
// 	}
// };

getEmergencyFood("94103").then((data) => console.log(data));
