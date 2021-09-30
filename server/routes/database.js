const { next } = require("cheerio/lib/api/traversing");
const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("favorites/:user_uid", (req, res) => {
    db.query(
        "SELECT * FROM user_favorites WHERE user_uid = $1",
        [req.params.user_uid],
        (err, res) => {
            if (err) {
                return next(err);
            }
            res.send(res.rows[0]);
        }
    );
});

router.post("addFavorite/:user_uid", (req, res) => {
    db.query(
        `
        INSERT INTO user_favorites(user_uid, favorites)
        VALUES ($1, $2)
        ON CONFLICT user_uid
        DO UPDATE SET favorites = EXCLUDED.favorites
        `,
        [req.params.user_uid, req.body],
        (err, res) => {
            if (err) {
                return next(err);
            }
            res.send(res);
        }
    );
});

module.exports = router;
