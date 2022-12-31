// external lib
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// routes
const workoutRotuer = require("./routes/workouts");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  next();
});

app.use("/api/workout", workoutRotuer);

// connecte to DB
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT} conncted to DB`);
    });
  })
  .catch((e) => console.log(e));
