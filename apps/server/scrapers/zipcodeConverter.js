const axios = require("axios");

/**
 * Returns data about a zipcode: 94103 -> {state: 'CA', city: 'San Francisco', country: 'US'}
 * @param {String} zipcode - Zipcode
 */
const convertZipcode = async (zipcode) => {
  let res = await axios
    .get(`http://ZiptasticAPI.com/${zipcode}`)
    .catch((err) => {
      throw new Error(err);
    });
  if (!res.data.state) {
    throw new Error("Non-US zipcode");
  }

  // Capitalize city name
  const citySplit = res["data"]["city"].toLowerCase().split(" ");
  for (let i = 0; i < citySplit.length; i++) {
    citySplit[i] = citySplit[i][0].toUpperCase() + citySplit[i].substr(1);
  }

  const state = res["data"]["state"];
  const city = citySplit.join(" ");
  const country = res["data"]["country"];
  return { state, city, country };
};

module.exports = { convertZipcode };
