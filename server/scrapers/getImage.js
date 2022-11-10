const request = require("request");

// Returns array of unsplash images, length defined by quantity
exports.getImage = (quantity) => {
	return new Promise((resolve, reject) => {
		let imageUrls = [];
		let promises = [];

		for (let i = 0; i < quantity; i++) {
			promises.push(
				new Promise((resolve, reject) => {
					var r = request.get(
						"https://source.unsplash.com/collection/2178991",
						(err, res, body) => {
							imageUrls.push(r.uri.href);
							resolve();
						}
					);
				})
			);
		}

		Promise.all(promises)
			.then(() => {
				resolve(imageUrls);
			})
			.catch((err) => {
				// Unsplash API never seems to fail, even with bad URLs.
				// Leaving this here just in case...
				reject(err);
			});
	});
};
