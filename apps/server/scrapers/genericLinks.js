const { convertZipcode } = require("./zipcodeConverter");
let path = require("path");
let fs = require("fs");
// let jsonPath = path.join(__dirname, "..", "generic_links.json");
const { genericLinks } = require("../generic_links");

const getGenericLinks = async (zipcode) => {
  let zipcodeData = await convertZipcode(zipcode);
  // let genericLinks = JSON.parse(fs.readFileSync(jsonPath).toString());
  let genericLinksZipcoded = [];
  for (let i = 0; i < genericLinks.length; i++) {
    genericLinks[i]["url"] = `${genericLinks[i]["url"]}${zipcode}`;
    genericLinks[i]["location"] = {
      city: zipcodeData["city"],
      country: zipcodeData["country"],
      postalCode: zipcode,
      region: zipcodeData["state"],
      virtual: false,
    };
    genericLinksZipcoded.push(genericLinks[i]);
  }
  return genericLinksZipcoded;
};

module.exports = { getGenericLinks };
