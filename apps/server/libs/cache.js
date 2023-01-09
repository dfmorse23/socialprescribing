const { redisClient } = require("../libs/redis");

const checkCache = async (req, res, next) => {
  const { zipcode } = req.params;
  const user = req.session.user;
  await redisClient.get(
    `${zipcode}${user ? "-" + user.id : ""}`,
    (err, data) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ error: "Something went wrong. Please try again later." });
        return;
      } else if (data !== null) {
        res.json(JSON.parse(data));
        return;
      } else {
        next();
      }
    }
  );
};

module.exports = {
  checkCache,
};
