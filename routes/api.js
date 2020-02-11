const router = require("express").Router();
const Workout = require("../models/Workout.js");

// get requests
router.get("/", function(req, res) {
  res.render("index");
});

router.get("/update", function(req, res) {
  Workout.find({}).then(dbWorkout => {
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

router.get("/add", function(req, res) {
  res.render("partials/add");
});

router.get("/delete", (req, res) => {
  Workout.find({})
    .populate("workout")
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// post requests
router.post("/add", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/update/:id", (req, res) => {
  Workout.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: {
        title: req.body.title,
        body: req.body.body
        // userUpdated: Date.now
      }
    },
    { new: true }
  ).then((error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

// delete requests
router.delete("/delete/:id", (req, res) => {
  Workout.findByIdAndDelete(req.params.id).then(err => {
    if (err) console.log(err);
  });
});

module.exports = router;
