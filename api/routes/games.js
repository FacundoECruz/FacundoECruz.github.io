import express from "express";
import Game from "../models/Game.js";
import Player from "../models/Player.js";
import mongoose from "mongoose";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving games", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const game = await Game.findById(id);
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving game", error });
  }
});

router.post("/", async (req, res) => {
  const players = req.body;
  const playersIds = await Promise.all(
    players.map(async (p) => {
      try {
        const dbPlayer = await Player.findOne({ username: p.username });
        return dbPlayer
      } catch (error) {
        console.log(error);
      }
    })
  );
  const cardsPerRound = [4, 6, 3, 6, 7, 8, 4, 3, 7]

  const game = new Game(
    {
      cardsPerRound,
      results: [],
      date: new Date(),
      round: 0,
      players: playersIds.map((id) => new mongoose.Types.ObjectId(id))
    }
  );
  try {
    const savedGame = await game.save();
    const response = {
      id: savedGame._id,
      round: savedGame.round,
      cardsInCurrent: cardsPerRound[savedGame.round]
    };
    console.log(savedGame)
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.patch("/", async(req, res) => {
  const game = await Game.findById(req.body.gameId)
  const roundResults = req.body.playersRound
  let round = parseInt(req.body.round)
  
  const resultsForDb = roundResults.map((player, index) => {
    if(player.bidsLost === 0)
    player.score = game.results[round][index] + 5 + player.bid;
    else
    player.score = game.results[round][index] - player.bidsLost;
    return player
  })
  
  const newRoundState = resultsForDb.map(player => {
    return {username: player.username, score: player.score, bid: 0, bidsLost: 0}
  })
  
  game.results.push(resultsForDb)
  try {
    const savedGame = await game.save();
    const response = {
      id: game._id,
      round: round += 1,
      cardsInCurrent: game.cardsPerRound[round],
      newRoundState: newRoundState,
    };
    console.log("***savedGame***")
    console.log(savedGame)
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err.message);
  }  
})

export { router };
