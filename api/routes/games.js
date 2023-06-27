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
        return dbPlayer;
      } catch (error) {
        console.log(error);
      }
    })
  );
  const cardsPerRound = [4, 6, 3, 6, 7, 8, 4, 3, 7];

  const game = new Game({
    cardsPerRound,
    results: [players],
    date: new Date(),
    round: 0,
    players: playersIds.map((id) => new mongoose.Types.ObjectId(id)),
  });
  try {
    const savedGame = await game.save();
    const response = {
      id: savedGame._id,
      round: savedGame.round,
      cardsInCurrent: cardsPerRound[savedGame.round],
      status: "in progress",
    };
    console.log("***Game Created***");
    console.log(savedGame);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.patch("/", async (req, res) => {
  const game = await Game.findById(req.body.gameId);
  const roundResults = req.body.playersRound;
  let round = parseInt(req.body.round);

  const resultsForDb = roundResults.map((player, index) => {
    if (player.bidsLost === 0)
      player.score =
        parseInt(game.results[round][index].score) + 5 + player.bid;
    else
      player.score =
        parseInt(game.results[round][index].score) - player.bidsLost;
    return player;
  });

  const newRoundState = resultsForDb.map((player) => {
    return {
      username: player.username,
      score: player.score,
      bid: 0,
      bidsLost: 0,
    };
  });

  game.round = game.round + 1;
  game.results.push(resultsForDb);
  try {
    const savedGame = await game.save();
    const inProgressResponse = {
      id: game._id,
      round: savedGame.round,
      cardsInCurrent: game.cardsPerRound[savedGame.round],
      newRoundState: newRoundState,
      status: "in progress",
    };
    const finishedResponse = {
      id: game._id,
      newRoundState: newRoundState,
      status: "finished",
    };
    console.log("***Game saved in Patch route***");
    console.log(savedGame);
    if (savedGame.round < 9) {
      res.status(200).json(inProgressResponse);
    } else {
      const winner = savedGame.results.reduce((maxObject, currentObject) => {
        if (currentObject.score > maxObject.score) {
          return currentObject;
        } else {
          return maxObject;
        }
      });
      console.log("***winner***")
      console.log(winner)
      res.status(200).json(finishedResponse);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
});

export { router };
