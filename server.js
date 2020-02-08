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
  db.Workout.find({}).then(dbWorkout => {
    console.log(dbWorkout[0]._id);
    const workoutArr = [];
    for (var i = 0; i < dbWorkout.length; i++) {
      const dbWorkoutObj = {
        id: dbWorkout[i]._id,
        title: dbWorkout[i].title,
        body: dbWorkout[i].body
      };
      workoutArr.push(dbWorkoutObj);
    }
    res.render("partials/update", { workouts: workoutArr });
  });
});

app.get("/add", function(req, res) {
  res.render("partials/add");
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

// post requests
app.post("/add", ({ body }, res) => {
  console.log(body);
  db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
      console.log(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/update/:id", (req, res) => {
  db.Workout.update(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
      $set: {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now()
      }
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
