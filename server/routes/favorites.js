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

    res.send(favorites);
});

module.exports = router;