const { convertZipcode } = require("./zipcodeConverter");
let path = require("path");
let fs = require("fs");
let jsonPath = path.join(__dirname, "..", "generic_links.json");
console.log(jsonPath);

const getGenericLinks = (zipcode) => {
	return new Promise((resolve, reject) => {
		convertZipcode(zipcode)
			.then((zipcodeData) => {
				let genericData = JSON.parse(fs.readFileSync(jsonPath).toString());
				let genericLinksZipcoded = [];

				// Add zipcode to urls & set location
				for (let i = 0; i < genericData.length; i++) {
					genericData[i]["url"] = `${genericData[i]["url"]}${zipcode}`;
					genericData[i]["location"] = {
						city: zipcodeData["city"],
						country: zipcodeData["country"],
						postalCode: zipcode,
						region: zipcodeData["state"],
						virtual: false,
					};
					genericLinksZipcoded.push(genericData[i]);
				}
				console.log(genericData[1]["url"]);
				resolve({ Generic: genericLinksZipcoded });
			})
			.catch((err) => reject(err));
	});
};

module.exports = { getGenericLinks };
