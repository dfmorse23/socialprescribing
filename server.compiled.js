const express = require("express");

var cors = require("cors"); // Routes


const scraper = require("./routes/scrapers.js");

const database = require("./routes/database.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/scrapers", scraper);
app.use("/user", database); // Set static folder

app.use(express.static("client/build"));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
