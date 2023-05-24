import express from "express";
import Game from "../models/Game.js";
const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving games', error });
  }
})

router.get("/:id", async(req, res) => {
  try {
    const id = req.params.id;
    const game = await Game.findById(id);
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving game', error });
  }
})

router.post("/", (req, res) => {
  const formData = req.body;
  const game = new Game(formData)
  console.log(game)
  game.save()
  res.redirect("/")
})

export {router};