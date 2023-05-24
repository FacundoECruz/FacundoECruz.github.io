import express from "express"
import mongoose from "mongoose"
import path from "path"
const __dirname = path.resolve();
import {router as playerRouter} from "./routes/players.js";
import {router as gameRouter} from "./routes/games.js"

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

app.use('/api/players', playerRouter)
app.use('/api/games', gameRouter)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen("3000", () => {
  console.log('ON 3000')
});
