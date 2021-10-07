const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.AWS_USER,
    host: process.env.AWS_HOST,
    database: process.env.AWS_DB,
    password: process.env.AWS_PASSWORD,
    port: process.env.AWS_PORT,
});

const createFavoritesTable = `
CREATE TABLE user_favorites (
    user_uid UUID PRIMARY KEY,
    favorites JSONB
    )`;

module.exports = {
    query: (text, params, callback) => {
        const start = Date.now();
        return pool.query(text, params, (err, res) => {
            callback(err, res);
        });
    },
    getClient: (callback) => {
        pool.connect((err, client, done) => {
            callback(err, client, done);
        });
    },
};
