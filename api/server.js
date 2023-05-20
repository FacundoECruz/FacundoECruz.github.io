import express from "express"
import mongoose from "mongoose"
import path from "path"
const __dirname = path.resolve();
import Player from "./models/Player.js"; 

const app = express();

mongoose.connect("mongodb://localhost:27017/altisima", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.get("/players", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving players', error });
  }
})

app.post("/api/player", (req, res) => {
  const formData = req.body;
  const player = new Player(formData)
  console.log(player)
  player.save()
  res.redirect("/players")
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen("3000", () => {
  console.log('ON 3000')
});
