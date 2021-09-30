const { next } = require("cheerio/lib/api/traversing");
const db = require("../db");

router.get("favorites/:id", (req, res) => {
    db.query(
        "SELECT * FROM users WHERE user_uid = $1",
        [req.params.id],
        (err, result) => {
            if (err) {
                return next(err);
            }
            res.send(result.rows[0]);
        }
    );
});
// router.post("/addFavorite/:id", (req, res) => {

// })
