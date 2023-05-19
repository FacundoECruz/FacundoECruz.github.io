const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Player = require("./models/Player")

mongoose.connect("mongodb://localhost:27017/altisima", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.get("/", async (req, res) => {
  res.send("hello");
  const player = new Player({
    name: "Facu",
    score: 10,
  })
  await player.save()
});

app.all('*', (req, res) => {
  res.send("not found")
})

app.listen("3000", () => {
  console.log('ON 3000')
});
