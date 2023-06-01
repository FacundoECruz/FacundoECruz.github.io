import express from "express"
import mongoose from "mongoose"
import path from "path"
const __dirname = path.resolve();
import {router as playersRouter} from "./routes/users.js";
import {router as gamesRouter} from "./routes/games.js"

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

app.use('/api/players', playersRouter)
app.use('/api/games', gamesRouter)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen("3000", () => {
  console.log('ON 3000')
});
