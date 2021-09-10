const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");
puppeteer.use(StealthPlugin());

// ---Puppeteer-extra + Stealth Plugins ---
const scrapeVolunteerMatch = async (zipcode) => {
	try {
		const endpoint = `https://www.volunteermatch.org/search/?l=${zipcode}`;
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setJavaScriptEnabled(true);
		await page.goto(endpoint), { waituntil: "networkidle0" };
		const pageHTML = await page.evaluate(() => document.querySelector("*").outerHTML);

		const $ = cheerio.load(pageHTML);
		const returnedData = [];

		// For each list item
		$("li.pub-srp-opps__opp").each((i, el) => {
			let cardData = cheerio.load(el);
			let title = "";
			let url = "";
			let location = "";
			let time = "";

			// Get titles & urls
			cardData("div > h3 > a").each((i, el) => {
				title = cardData(el)
					.text()
					.replace(/(\r\n|\n|\r)/gm, " ")
					.trim();

				url = `https://www.volunteermatch.org` + cardData(el).attr("href");
			});

			// Get locations
			cardData("div.pub-srp-opps__info > div.pub-srp-opps__loc").each((i, el) => {
				location = cardData(el).text();
			});

			// Get time/date
			if (cardData("div.pub-srp-opps__info > div.pub-srp-opps__date.i-block").length > 0) {
				cardData("div.pub-srp-opps__info > div.pub-srp-opps__date.i-block").each(
					(i, el) => {
						// Flexible Schedule
						time = cardData(el)
							.text()
							.replace(/(\r\n|\n|\r)/gm, "")
							.replace("|", "")
							.trim();
					}
				);
			} else {
				cardData("div.pub-srp-opps__info > div.pub-srp-opps__date > div.i-block").each(
					(i, el) => {
						// Time & date
						time = cardData(el)
							.text()
							.replace(/(\r\n|\n|\r|\|)/gm, "")
							.replace(/(?<=[0-9]).*(?=\-)/, " ")
							.trim();
					}
				);
			}

			returnedData.push({
				title: title,
				url: url,
				location: location,
				time: time,
				tag: "dummy tag",
			});
		});

		await browser.close();

		return returnedData;
	} catch (err) {
		return err;
	}
};

scrapeVolunteerMatch("94103").then((data) => console.log(data));
