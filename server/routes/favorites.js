const express = require("express");
const router = express.Router();
const primsa = require("../../primsa/client");

/**
 * get user favorites
 * add favorite
 * remove favorite
 * delete favorites?
 */

router.get("/favorites/:user_uid", async (req, res) => {
    const { user_uid } = req.params;
    if (!user_uid) {
        res.status(400).send({ message: "user_uid is required" });
    }
    const favorites = await primsa.user_favorites.findMany({
        where: {
            userId: user_uid,
        },
    });

    return res.send(favorites);
});

router.post("/favorites/:user_uid", async (req, res) => {
    const { user_uid } = req.params;
    const { tag, url, date, title, location } = req.body;

    if (!user_uid) {
        res.status(400).send({ message: "user_uid is required" });
    }

    if (!tag || !url || !date || !title || !location) {
        res.status(400).send({ message: "tag, url, date, title, location are required" });
    }

    const user = await prisma.user.findFirst({
        where: {
            id: user_uid,
        },
    });

    if (!user) {
        res.status(400).send({ message: "user does not exist" });
    }

    const favorite = await prisma.user_favorites.create({
        data: {
            tag,
            url,
            date,
            title,
            location,
            userId: user.id,
        },
    });

    return res.status(200).send({
        message: "favorite added",
        favorite,
    });

});

module.exports = router;