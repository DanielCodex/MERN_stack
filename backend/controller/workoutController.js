// external lib
const mongoose = require("mongoose");

// model modules
const Workout = require("../models/workoutModel");
// utils modules
const validId = require("../utils/validId");

// get all workout
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json({ workouts });
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  // check if id is valid mongo id
  if (!validId(id)) {
    return res.status(404).json({ error: "no such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    // if you don't write return it will run the rest of the code
    // yeah i forget that. we are in expressjs
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.create({
      title,
      load,
      reps,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!validId(id)) {
    return res.status(404).json({ error: "No such workout to delete" });
  }

  // i don't konw if that's a good idea to put mongoose in
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!validId(id)) {
    return res.status(404).json({ error: "No such workout to delete" });
  }

  // u can either send tilte or reps, load or two of them or all of them together
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  const getTheUpdatedWorkout = await Workout.findById(id);

  if (!workout || !getTheUpdatedWorkout) {
    return res.status(404).json({ error: "No such workout" });
  }

  // this will return what it was. we want to see how it did change.
  res.status(200).json(getTheUpdatedWorkout);
};

module.exports = {
  createWorkout,
  getWorkouts, // for returning all workout
  getWorkout, // for returning single workout
  deleteWorkout,
  updateWorkout
};
