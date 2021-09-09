const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// ---Puppeteer-extra + Stealth Plugins ---
const scrapeVolunteerMatch = async (zipcode) => {
	try {
		const url = `https://www.volunteermatch.org/search/?l=${zipcode}`;
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setJavaScriptEnabled(true);
		await page.goto(url), { waituntil: "networkidle0" };
		const pageHTML = await page.evaluate(() => document.querySelector("*").outerHTML);

		await browser.close();

		return;
	} catch (err) {
		return err;
	}
};

scrapeVolunteerMatch("94103").then((data) => console.log(data));
