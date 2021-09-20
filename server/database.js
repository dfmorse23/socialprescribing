const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const { Pool, Client } = require("pg");

const pool = new Pool({
    user: process.env.AWS_USER,
    host: process.env.AWS_HOST,
    database: process.env.AWS_DB,
    password: process.env.AWS_PASSWORD,
    port: process.env.AWS_PORT,
});

pool.query("SELECT NOW()", (err, res) => {
    console.log(err, res);
    pool.end();
});
