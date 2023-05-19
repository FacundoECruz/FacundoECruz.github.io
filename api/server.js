import express from "express"
import mongoose from "mongoose"
import path from "path"
const __dirname = path.resolve();

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

// Ruta para todas las demás solicitudes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen("3000", () => {
  console.log('ON 3000')
});

// app.get("/login", (req, res) => {})
// app.post("/login", (req, res) => {})
// app.get("/player", (req, res) => {})
// app.post("player", (req, res) => {})
// app.get("/player/:id", (req, res) => {})
// app.get("/game", (req, res) => {})
// app.post("/game", (req, res) => {})
// app.get("/game/:id", (req, res) => {})
