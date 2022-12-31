// bad naming for file but we go with it for now
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutScheme = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// mongo will write workouts (plural) for us in mongo db atlas
module.exports = mongoose.model("Workout", workoutScheme);
