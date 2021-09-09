require("dotenv").config({ path: "../.env" });
const axios = require("axios");
const cheerio = require("cheerio");
const xml2js = require("xml2js");

const convertZipcode = (zipcode) => {
	return new Promise((resolve, reject) => {
		var config = {
			method: "post",
			url: `http://production.shippingapis.com/ShippingApi.dll
			?API=CityStateLookup
			&XML=<CityStateLookupRequest USERID="${process.env.USPS_USERID}"><ZipCode ID="0"><Zip5>${zipcode}</Zip5></ZipCode></CityStateLookupRequest>`,
		};

		axios(config)
			.then((res) => {
				xml2js.parseString(res["data"], (err, result) => {
					const city = result["CityStateLookupResponse"]["ZipCode"][0]["City"][0].replace(
						/\s/g,
						"-"
					);
					const state = result["CityStateLookupResponse"]["ZipCode"][0]["State"][0];
					resolve({ state: state, city: city });
				});
			})
			.catch((err) => {
				reject(err);
			});
	});
};

const getEvents = (zipcode) => {
	return new Promise((resolve, reject) => {
		convertZipcode(zipcode).then((res) => {
			// Submit city, state, and zipcode to EventBrite
			const eventBriteUrl = `https://www.eventbrite.com/d/${res["state"]}--${res["city"]}/${zipcode}/`;

			axios
				.get(eventBriteUrl)
				.then((events) => {
					const $ = cheerio.load(events["data"]);
					const eventTitles = [];
					const eventTimes = [];
					const eventLocations = [];
					const eventUrls = [];

					// Get titles
					console.log($("div.eds-is-hidden-accessible"));
					if ($("div.eds-is-hidden-accessible")) {
						console.log("Found titles");
						$("div.eds-is-hidden-accessible").each((i, el) => {
							// EventBrite lists titles twice with this class. Only record every other title.
							if (i % 2 == 1) {
								const title = $(el).text();
								// Remove characters after pipe (usually contains extra description)
								eventTitles.push(title.split("|")[0]);
							}
						});
					} else {
						reject("Found no titles.");
					}

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

					resolve([info]);
				})
				.catch((err) => {
					reject(err);
				});
		});
	});
};

getEvents(94103)
	.then((data) => console.log(data))
	.catch((err) => console.log(err.message));
module.exports = { getEvents: getEvents };
