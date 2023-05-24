import express from "express";
import Player from "../models/Player.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving players', error });
  }
})

router.get("/:id", async(req, res) => {
  try {
    const id = req.params.id;
    const player = await Player.findById(id);
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving player', error });
  }
})

router.post("/", (req, res) => {
  const formData = req.body;
  const player = new Player(formData)
  console.log(player)
  player.save()
  res.redirect("/players")
})

export {router};