require('dotenv').config()
const express = require("express");
const workoutRotuer = require("./routes/workouts");

const app = express();

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()
})

app.get("/", (req, res) => {
  res.json({msg: "hello there"});
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
