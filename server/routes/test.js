const express = require("express");
const path = require("path");
const router = express.Router();
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { Pool } = require("pg");

const db = new Pool({
  user: process.env.AWS_USER,
  host: process.env.AWS_HOST,
  database: process.env.AWS_DB,
  password: process.env.AWS_PASSWORD,
  port: process.env.AWS_PORT,
});

console.log('Started')
db.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  db.end()
})