const axios = require("axios");
const cheerio = require("cheerio");

const convertZipcode = (zipcode) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`http://ZiptasticAPI.com/${zipcode}`)
			.then((res) => {
				const state = res["data"]["state"];
				const city = res["data"]["city"];
				const country = res["data"]["country"];
				resolve({ state: state, city: city, country: country });
			})
			.catch((err) => {
				reject(err.message);
			});
	});
};

const getEvents = (zipcode) => {
	return new Promise((resolve, reject) => {
		convertZipcode(zipcode).then((res) => {
			// Submit city, state, and zipcode to EventBrite
			const city = res["city"].replace(/\s/g, "-");
			const eventBriteUrl = `https://www.eventbrite.com/d/${res["state"]}--${city}/${zipcode}/`;

			axios
				.get(eventBriteUrl)
				.then((events) => {
					const $ = cheerio.load(events["data"]);
					const eventTitles = [];
					const eventDates = [];
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

					// Get dates
					$("div.eds-event-card-content__sub-title").each((i, el) => {
						if (i % 2 == 1) {
							const timeDate = $(el).text();
							const timeDateSplit = timeDate.split(", ");
							eventDates.push(timeDateSplit[1]);
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

					const returnedData = [];
					for (let i = 0; i < eventTitles.length; i++) {
						returnedData.push({
							title: eventTitles[i],
							date: {
								startDate: eventDates[i],
								endDate: null,
							},
							location: {
								postalCode: zipcode,
								city: res["city"],
								region: res["state"],
								country: res["country"],
								virtual: false,
							},
							url: eventUrls[i],
							tag: "EventBrite",
						});
					}

					resolve(returnedData);
				})
				.catch((err) => {
					reject(err);
				});
		});
	});
};

module.exports = { getEvents: getEvents };
