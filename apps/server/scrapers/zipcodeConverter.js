const axios = require("axios");

/**
 * Returns data about a zipcode: 94103 -> {state: 'CA', city: 'San Francisco', country: 'US'}
 * @param {String} zipcode - Zipcode
 */
const convertZipcode = (zipcode) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`http://ZiptasticAPI.com/${zipcode}`)
			.then((res) => {
				if (!res["data"]["state"]) {
					reject("Non-US zipcode");
				}

				// Capitalize city name
				const citySplit = res["data"]["city"].toLowerCase().split(" ");
				for (let i = 0; i < citySplit.length; i++) {
					citySplit[i] = citySplit[i][0].toUpperCase() + citySplit[i].substr(1);
				}

				const state = res["data"]["state"];
				const city = citySplit.join(" ");
				const country = res["data"]["country"];
				resolve({ state: state, city: city, country: country });
			})
			.catch((err) => {
				reject(err);
			});
	});
};

module.exports = { convertZipcode };
