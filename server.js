const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 7000;

const app = express();
const path = require("path");

// set static directories
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use(require("./routes/api.js"));

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://heroku_kcd04wzv:6of2rur51qq07p83dbm46kf21d@ds033887.mlab.com:33887/heroku_kcd04wzv",
  {
    useNewUrlParser: true
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
