const express = require("express");
const { getCategories } = require("../scrapers/eventbriteScraper");
const { getVolunteering } = require("../scrapers/volunteerScraper");
const { getGenericLinks } = require("../scrapers/genericLinks");
const router = express.Router();
const { checkCache } = require("../libs/cache");
const { redisClient } = require("../libs/redis");

router.post("/getEvents/:zipcode", checkCache, async (req, res) => {
  try {
    let zipcode = req.params.zipcode;
    const user = req.session.user;

    const eventBriteData = await getCategories(
      zipcode,
      [
        "health",
        "music",
        "charity",
        "community",
        "family",
        "hobbies",
        "home",
        "spirituality",
        "school",
        "sports",
        "travel",
      ],
      user
    );
    const volunteermatchData = await getVolunteering(zipcode, user);
    const genericLinks = await getGenericLinks(zipcode, user);

    const cacheKey = `${user.id}`;
    // Replace cacheKey varible with line below when favorites feature is working
    // const cacheKey = `${zipcode}${user ? "-" + user.id : ""}`;

    let data = {
      cacheKey,
      events: [...eventBriteData, ...volunteermatchData, ...genericLinks],
    };

    //store for 1 hour
    redisClient.setex(cacheKey, 3600, JSON.stringify(data.events));
    return res.json(data);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: `${e}` });
  }
});

module.exports = router;
