const { redisClient } = require("../libs/redis");

const checkCache = async (req, res, next) => {
  const { zipcode } = req.params;
  const user = req.session.user;
  const cacheKey = `${user.id}`
  // Replace cacheKey varible with line below when favorites feature is working
  // const cacheKey = `${zipcode}${user ? "-" + user.id : ""}`;
  
  await redisClient.get(cacheKey, (err, data) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "Something went wrong. Please try again later." });
      return;
    } else if (data !== null) {
      res.json({ 
        events: JSON.parse(data),
        cacheKey
      });
      return;
    } else {
      next();
    }
  });
};

module.exports = {
  checkCache,
};
