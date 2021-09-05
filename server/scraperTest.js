const axios = require("axios");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
// const cheerio = require("cheerio");

// ---Puppeteer-extra + Stealth Plugins // Triggers CAPTCHA & sometimes forbidden error---
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

// ---Puppeteer scraper // Triggers CAPTCHA---
// const getEmergencyFood = async (zipcode) => {
// 	try {
// 		const args = [
// 			"--no-sandbox",
// 			"--disable-setuid-sandbox",
// 			"--disable-infobars",
// 			"--window-position=0,0",
// 			"--ignore-certifcate-errors",
// 			"--ignore-certifcate-errors-spki-list",
// 			'--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
// 		];

// 		const options = {
// 			args,
// 			headless: true,
// 			ignoreHTTPSErrors: true,
// 			userDataDir: "./tmp",
// 		};

//      const url = `https://www.findhelp.org/food/emergency-food?postal=${zipcode}`;
// 		const browser = await puppeteer.launch();
// 		const page = await browser.newPage();
// 		await page.setJavaScriptEnabled(true);
// 		await page.goto(url);
// 		const pageHTML = await page.evaluate(
// 			"new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML"
// 		);
// 		await browser.close();

// 		return pageHTML;
// 	} catch (err) {
// 		return err;
// 	}
// };

// ---Cheerio scraper // Triggers CAPTCHA---
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
