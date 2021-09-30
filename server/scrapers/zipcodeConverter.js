const axios = require("axios");

const convertZipcode = (zipcode) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`http://ZiptasticAPI.com/${zipcode}`)
			.then((res) => {
				if (!res["data"]["state"]) {
					reject("Non-US zipcode");
				}

				const state = res["data"]["state"];
				const city = res["data"]["city"];
				const country = res["data"]["country"];
				resolve({ state: state, city: city, country: country });
			})
			.catch((err) => {
				reject(err);
			});
	});
};

module.exports = { convertZipcode: convertZipcode };
