const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();
const path = require("path");
const router = express.Router();

// set static directories
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workoutdb", {
  useNewUrlParser: true
});

// creating the mongoose database
db.Workout.create({})
  .then(dbWorkout => {
    console.log(dbWorkout);
  })
  .catch(({ message }) => {
    console.log(message);
  });

// get requests
app.get("/", function(req, res) {
  res.render("index");
});
app.get("/update", function(req, res) {
  // db.Workout.find()
  //   .then(dbWorkout => {
  res.render("partials/update");
  // })
  // .catch(err => {
  //   res.json(err);
  // });
});

app.get("/add", function(req, res) {
  res.render("partials/add");
});

// post requests
app.post("/add", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbWorkout => {
      // res.json(dbWorkout);
      console.log(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// app.post("/update", ({ body }, res) => {
// db.Workout.create(body).then({_id}) =>
// db.Workout.findOneAndUpdate({}, {$set: {title: }, {workout: }})

// });

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .populate("workout")
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
