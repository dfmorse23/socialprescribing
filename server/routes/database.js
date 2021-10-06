const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/favorites/:user_uid", (req, res) => {
    db.query(
        "SELECT * FROM user_favorites WHERE user_uid = $1",
        [req.params.user_uid],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result.rows[0]);
        }
    );
});

router.post("/addFavorite/:user_uid", (req, res) => {
    db.query(
        `
        INSERT INTO user_favorites(user_uid, favorites)
        VALUES ($1, $2)
        ON CONFLICT (user_uid)
        DO UPDATE SET favorites = user_favorites.favorites || EXCLUDED.favorites
        `,
        [req.params.user_uid, req.body],
        (err, result) => {
            if (err) {
                return err;
            }
            res.send(result.rows[0]);
        }
    );
});

router.post("/removeFavorite/:user_uid", (req, res) => {
    db.query(
        `
        UPDATE user_favorites
        SET favorites = favorites - $2
        WHERE user_uid = $1
        `,
        [req.params.user_uid, Object.keys(req.body)[0]],
        (err, result) => {
            if (err) {
                return err;
            }
            res.send(result.rows[0]);
        }
    );
});

router.post("/deleteFavorites/:user_uid", (req, res) => {
    db.query(
        "DELETE FROM user_favorites WHERE user_uid = $1",
        [req.params.user_uid],
        (err, result) => {
            if (err) {
                return err;
            }
            res.send(result.rows[0]);
        }
    );
});

module.exports = router;
