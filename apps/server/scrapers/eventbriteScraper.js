const axios = require("axios");
const cheerio = require("cheerio");
const Filter = require("bad-words");
const { convertZipcode } = require("./zipcodeConverter");
const { prisma } = require("db");

// Initialize bad-words filter w/ new words
let filter = new Filter();
let newBadWords = ["gay", "lesbian", "kinky", "spank"];
filter.addWords(...newBadWords);

/**
 * This function takes in a zipcode, a list of categories, and a user, and returns a list of events
 * that match the categories and zipcode
 * @param zipcode - The zipcode of the user
 * @param categories - an array of categories that the user has selected
 * @param user - the user object from the database
 * @returns An array of events
 */

const getCategories = async (zipcode, categories, user) => {
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
      zipcode,
      user
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
 * It scrapes an EventBrite category, using city, state, country, zipcode, and user, and returns a list of events
 * @param category - The category of the event.
 * @param city - The city the user is in.
 * @param state - The state the event is in.
 * @param country - "US"
 * @param zipcode - The zipcode of the user.
 * @param user - The user object.
 * @returns It's returning an array of objects.
 */

const getCategory = async (category, city, state, country, zipcode, user) => {
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
  let events = await axios.get(url)
  if (events.status !== 200) {
    return [];
  } else {
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

    // Get locations using the sub-content class
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

    // Get URLs using the primary-content class
    $("div.eds-event-card-content__primary-content > a").each((i, el) => {
      if (i % 2 == 1) {
        const url = $(el).attr("href");
        eventUrls.push(url);
      }
    });

    // Get image links using the image-content class
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
        /* It's checking if the user has favorited the event. If they have, it sets the favoriteId to the id
		 of the favorite. */
        let favoriteId = null;

        if (user) {
          const event = await prisma.event.findFirst({
            where: {
              url: eventUrls[i],
            },
          });

          if (event) {
            const prismaUser = await prisma.user.findUnique({
              where: {
                id: user.id,
              },
              include: {
                favorites: {
                  include: { event: true },
                },
              },
            });

            prismaUser.favorites.find((favorite) => {
              if (favorite.event.id === event.id) {
                favoriteId = favorite.id;
              }
            });
          }
        }
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
          favoriteId,
          image: eventImages[i],
          tag: categoryUrls[category].tag,
        });
      }
    }
    return dataList;
  }
};

module.exports = { getCategories };
