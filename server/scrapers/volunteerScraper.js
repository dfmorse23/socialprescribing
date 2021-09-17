const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");
puppeteer.use(StealthPlugin());

// ---Puppeteer-extra + Stealth Plugins ---
const getEvents = (zipcode) => {
  return new Promise(async (resolve, reject) => {
    try {
      const endpoint = `https://www.volunteermatch.org/search/?l=${zipcode}`;
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setJavaScriptEnabled(true);
      await page.goto(endpoint);
      const pageHTML = await page.evaluate(
        () => document.querySelector("*").outerHTML
      );

      browser.close();

      resolve(returnedData);
    } catch (err) {
      reject(err);
    }
  });
};

var request = require("postman-request");
var fs = require("fs");

var proxyRequest = request.defaults({
  proxy: "http://74eded4bd1094670b6f01213272c474d:@proxy.crawlera.com:8011",
});

var options = {
  url: "https://www.volunteermatch.org/search/?l=94103",
  ca: fs.readFileSync("zyte-smartproxy-ca.crt"),
  requestCert: true,
  rejectUnauthorized: true,
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(response.headers);
    console.log(body);
    try {
      const $ = cheerio.load(body);
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
        cardData("div.pub-srp-opps__info > div.pub-srp-opps__loc").each(
          (i, el) => {
            location = cardData(el).text();
          }
        );

        // Get time/date
        if (
          cardData("div.pub-srp-opps__info > div.pub-srp-opps__date.i-block")
            .length > 0
        ) {
          cardData(
            "div.pub-srp-opps__info > div.pub-srp-opps__date.i-block"
          ).each((i, el) => {
            // Detect no specific time/date
            time = cardData(el)
              .text()
              .replace(/(\r\n|\n|\r)/gm, "")
              .replace("|", "")
              .trim();
          });
        } else {
          cardData(
            "div.pub-srp-opps__info > div.pub-srp-opps__date > div.i-block"
          ).each((i, el) => {
            // Time & date
            time = cardData(el)
              .text()
              .replace(/(\r\n|\n|\r|\|)/gm, "")
              .replace(/(?<=[0-9]).*(?=\-)/, " ")
              .trim();
          });
        }

        returnedData.push({
          title: title,
          url: url,
          location: location,
          time: time,
          tag: "Volunteering",
        });
      });
      console.log(returnedData);
      return returnedData;
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log(error, response, body);
  }
}

proxyRequest(options, callback);
// module.exports = { getEvents: getEvents };
