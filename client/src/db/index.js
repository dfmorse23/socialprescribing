const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.AWS_USER,
    host: process.env.AWS_HOST,
    database: process.env.AWS_DB,
    password: process.env.AWS_PASSWORD,
    port: process.env.AWS_PORT,
});

const createUserTable = `
CREATE TABLE users (
    user_uid UUID PRIMARY KEY,
    resource_uid JSONB
    )`;

try {
    const res = pool.query(createUserTable);
    console.log(res);
} catch (err) {
    console.log(err);
}

// module.exports = {
//     query: (text, params, callback) => {
//         return pool.query(text, params, callback);
//     },
// };
