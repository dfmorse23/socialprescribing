const express = require("express");
const router = express.Router();
const { prisma } = require("db");
const { redisClient } = require("../libs/redis");

/**
 * get user favorites
 * add favorite
 * remove favorite
 * delete favorites?
 */

router.get("/", async (req, res) => {
  // console.log(req.params);
  const user_id = req.session.user.id;

  if (!user_id) {
    return res.status(401).send({
      message: "not authenticated",
      success: false,
    });
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: user_id,
    },
    include: {
      event: true,
    },
  });

  return res.json({
    favorites,
    success: true,
  });
});

router.post("/", async (req, res) => {
  try {
    const user_id = req.session.user.id;
    let { tag, url, date, title, location, cacheKey, index } = req.body;
    // console.log(req.body);

    if (!user_id) {
      return res.status(401).send({
        message: "not authenticated",
        success: false,
      });
    }

    if (!tag || !url || !date || !title || !location) {
      return res.status(400).send({
        message: "tag, url, date, title, location are required",
        success: false,
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return res.status(400).send({
        message: "user does not exist",
        success: false,
      });
    }

    const existingEvent = await prisma.event.findFirst({
      where: {
        tag,
        url,
        date,
        title,
        location,
      },
    });

    if (existingEvent) {
      let favorite = await prisma.favorite.findFirst({
        where: {
          userId: user_id,
          eventId: existingEvent.id,
        },
      });

      if (!favorite) {
        favorite = await prisma.favorite.create({
          data: {
            userId: user.id,
            eventId: existingEvent.id,
          },
        });
        await redisClient.get(cacheKey, (err, data) => {
          if (err) {
            console.log(err);
            return;
          } else if (data !== null) {
            data = JSON.parse(data);
            data[index].favoriteId = favorite.id;
            redisClient.setex(cacheKey, 3600, JSON.stringify(data));

            return;
          } else {
            console.log("cache not found");
          }
        });
      }

      return res.status(200).send({
        message: "favorite added",
        favorite,
        success: true,
      });
    }

    const createdEvent = await prisma.event.create({
      data: {
        tag,
        url,
        date,
        title,
        location,
      },
    });

    let favorite = await prisma.favorite.findFirst({
      where: {
        userId: user_id,
        eventId: createdEvent.id,
      },
    });

    if (!favorite) {
      favorite = await prisma.favorite.create({
        data: {
          userId: user.id,
          eventId: createdEvent.id,
        },
      });
      await redisClient.get(cacheKey, (err, data) => {
        if (err) {
          console.log(err);
          return;
        } else if (data !== null) {
          data = JSON.parse(data);
          data[index].favoriteId = favorite.id;
          redisClient.setex(cacheKey, 3600, JSON.stringify(data));

          return;
        } else {
          console.log("cache not found");
        }
      });
    }

    return res.status(200).send({
      message: "favorite cached and added",
      favorite,
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.json({ success: false, message: e.message }).status(500);
  }
});

router.delete("/:favoriteId/:cacheKey/:index", async (req, res) => {
  try {
    const { favoriteId, cacheKey, index } = req.params;
    const user_id = req.session.user.id;

    if (!user_id) {
      return res.status(401).send({
        message: "not authenticated",
        success: false,
      });
    }

    if (!favoriteId) {
      return res.status(400).send({
        message: "favorite id is required",
        success: false,
      });
    }

    const favorite = await prisma.favorite.findFirst({
      where: {
        id: favoriteId,
      },
    });

    if (!favorite) {
      return res.status(400).send({
        message: "favorite does not exist",
        success: false,
      });
    }

    // await prisma.favorite.delete({
    //   where: {
    //     id: favoriteId,
    //   },
    // });

    await redisClient.get(cacheKey, (err, data) => {
      if (err) {
        console.log(err);
        return;
      } else if (data !== null) {
        data = JSON.parse(data);
        data[index].favoriteId = null;
        redisClient.setex(cacheKey, 3600, JSON.stringify(data));

        return;
      } else {
        console.log("cache not found");
      }
    });

    return res.status(200).send({
      message: "favorite deleted",
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.json({ success: false, message: e.message }).status(500);
  }
});

module.exports = router;
