const axios = require("axios");
const cheerio = require("cheerio");
const Filter = require("bad-words");
const { convertZipcode } = require("./zipcodeConverter");

// Initialize bad-words filter w/ new words
let filter = new Filter();
let newBadWords = ["gay", "lesbian", "kinky", "spank"];
filter.addWords(...newBadWords);

/**
 * Scrape multiple EventBrite categories. Returns object with an array of EventBrite event objects.
 * @param {String} zipcode - Zipcode
 * @param {Array<String>} categories - Array of categories: business, food, health, music, auto, charity, community, family, fashion, film, hobbies, home, performing, government, spirituality, school, science, holiday, sports, travel, other
 */

// const getCategories = (zipcode, categories) => {
//   return new Promise((resolve, reject) => {
//     convertZipcode(zipcode)
//       .then((zipcodeData) => {
//         // Submit city, state, and zipcode to EventBrite
//         const city = zipcodeData["city"].replace(/\s/g, "-");
//         const state = zipcodeData["state"];
//         const country = zipcodeData["country"];

//         let promises = [];
//         let eventsList = [];

//         for (let i = 0; i < categories.length; i++) {
//           promises.push(
//             getCategory(categories[i], state, city, country, zipcode).then(
//               (data) => {
//                 for (let j = 0; j < data.length; j++) {
//                   eventsList.push(data[j]);
//                 }
//               }
//             )
//           );
//         }

//         Promise.allSettled(promises)
//           .then(() => {
//             resolve({ EventBrite: eventsList });
//           })
//           .catch((err) => reject(err));
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

const getCategories = async (zipcode, categories) => {
  let zipcodeData = await convertZipcode(zipcode);
  // Submit city, state, and zipcode to EventBrite
  const city = zipcodeData.city.replace(/\s/g, "-");
  const state = zipcodeData.state;
  const country = zipcodeData.country;

  let eventsList = [];
  for (let i = 0; i < categories.length; i++) {
    let category = await getCategory(
      categories[i],
      state,
      city,
      country,
      zipcode
    );
    if (category) {
      for (let j = 0; j < category.length; j++) {
        eventsList.push(category[j]);
      }
    }
  }

  return eventsList;
};
/**
 * Scrape an EventBrite category, using city, state, country, and zipcode. Returns an array of event objects.
 * @param {String} category - Single category: business, food, health, music, auto, charity, community, family, fashion, film, hobbies, home, performing, government, spirituality, school, science, holiday, sports, travel, other
 * @param {String} city  - City, formatted like 'san-francisco'
 * @param {String} state - State abbreviation, like CA
 * @param {String} country - Country
 * @param {String} zipcode - Zipcode
 */
const getCategory = async (category, city, state, country, zipcode) => {
  let categoryUrls = {
    business: { url: "business--events", tag: "Work" },
    food: { url: "food-and-drink--events", tag: "Food" },
    health: { url: "health--events", tag: "Health" },
    music: { url: "music--events", tag: "Art" },
    auto: { url: "auto-boat-and-air--events", tag: "Education" },
    charity: { url: "charity-and-causes--events", tag: "Volunteering" },
    community: { url: "community--events", tag: "Volunteering" },
    family: { url: "family-and-education--events", tag: "Education" },
    fashion: { url: "fashion--events", tag: "Art" },
    film: { url: "film-and-media--events", tag: "Art" },
    hobbies: { url: "hobbies--events", tag: "Art" },
    home: { url: "home-and-lifestyle--events", tag: "Housing" },
    performing: { url: "arts--events", tag: "Art" },
    government: { url: "government--events", tag: "Legal" },
    spirituality: { url: "spirituality--events", tag: "Spirituality" },
    school: { url: "school-activities--events", tag: "Education" },
    science: { url: "science-and-tech--events", tag: "Education" },
    holiday: { url: "holiday--events", tag: "Art" },
    sports: { url: "sports-and-fitness--events", tag: "Health" },
    travel: { url: "travel-and-outdoor--events", tag: "Transit" },
    // other: { "url": "other--events", tag: "" }, Probably don't want to use this, returns a lot of misc events
  };

  if (!(category in categoryUrls)) {
    throw new Error(`Unsupported EventBrite category: ${category}`);
  }
	
  let url = `https://www.eventbrite.com/d/${state}--${city}/${categoryUrls[category].url}/${zipcode}/`;
	let events = await axios.get(url);
  // console.log(`--------${events.data}-----`)
  const $ = cheerio.load(events.data);
  const eventTitles = [];
  const eventDates = [];
  const eventLocations = [];
  const eventUrls = [];
  const eventImages = [];
  // Get titles
  $("div.eds-is-hidden-accessible").each((i, el) => {
    // console.log(el);
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
        .each((_, el) => {
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

  // Get image links
  $(
    "div.eds-event-card-content__image-content > img.eds-event-card-content__image"
  ).each((i, el) => {
    if (i % 2 == 1) {
      const imageUrl = $(el).attr("data-src");
      eventImages.push(imageUrl);
    }
  });
  /* It's logging the event titles to the console. */
  // console.log(eventTitles);
  const dataList = [];
  for (let i = 0; i < eventTitles.length; i++) {
    // Add event if no profanity detected
    if (filter.isProfane(eventTitles[i]) == false) {
      // console.log(eventTitles[i]);
      dataList.push({
        title: eventTitles[i],
        date: {
          startDate: eventDates[i],
          endDate: null,
        },
        location: {
          postalCode: zipcode,
          city: city,
          region: state,
          country: country,
          virtual: false,
        },
        url: eventUrls[i],
        image: eventImages[i],
        tag: categoryUrls[category].tag,
      });
    }
  }
  // console.log(dataList)
  return dataList;
};

module.exports = { getCategories };
