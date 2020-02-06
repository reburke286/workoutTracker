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

// get requests
app.get("/", function(req, res) {
  res.render("index");
});

app.get("/update", function(req, res) {
  const workoutArr = [];
  db.Workout.find({})
    .then(dbWorkout => {
      dbWorkout.forEach(function(doc, err) {
        workoutArr.push(doc);
      });
    })
    .then(() => {
      res.render("partials/update", { workouts: workoutArr });
    });
});

// router.get('/get-data', function(req, res, next) {
//   var resultArray = [];
//   mongo.connect(url, function(err, db) {
//     assert.equal(null, err);
//     var cursor = db.collection('user-data').find();
//     cursor.forEach(function(doc, err) {
//       assert.equal(null, err);
//       resultArray.push(doc);
//     }, function() {
//       db.close();
//       res.render('index', {items: resultArray});
//     });
//   });
// });

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
