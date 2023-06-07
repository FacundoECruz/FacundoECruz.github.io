import express from "express"
import mongoose from "mongoose"
import cors from "cors";
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

const corsOptions = {
  origin: 'http://127.0.0.1:5173'
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/players', playersRouter)
app.use('/api/games', gamesRouter)

app.listen("3000", () => {
  console.log('ON 3000')
});
