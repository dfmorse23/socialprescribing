const express = require("express");
const { getCategories } = require("../scrapers/eventbriteScraper");
const { getVolunteering } = require("../scrapers/volunteerScraper");
const { getGenericLinks } = require("../scrapers/genericLinks");
const router = express.Router();
const {checkCache} = require("../libs/cache");
const { redisClient } = require("../libs/redis");

router.post("/getEvents/:zipcode", checkCache, async (req, res) => {
  try {
    let zipcode = req.params.zipcode;
    const eventBriteData = await getCategories(zipcode, [
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
    ]);
    const volunteermatchData = await getVolunteering(zipcode);
    const genericLinks = await getGenericLinks(zipcode);
		//store for 1 hour
		let data = [
      ...eventBriteData,
      ...volunteermatchData.Volunteering,
      ...genericLinks,
    ]
		redisClient.setex(zipcode, 3600, JSON.stringify(data))
    return res.json(data);
  } catch (e) {
    console.log(e);

    res.status(400).json({ error: `${e}` });
  }
});

module.exports = router;
