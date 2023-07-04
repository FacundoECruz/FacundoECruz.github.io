import { useState } from "react";
import GameForm from "./GameForm";
import Scores from "./Scores";
import api from "../../utils/api-client";
import { useEffect } from "react";

function NewGame() {
  const [players, setPlayers] = useState(() => {
    const storedPlayers = JSON.parse(window.localStorage.getItem("players"));
    if (storedPlayers === null) {
      return [];
    } else {
      return storedPlayers;
    }
  });
  const [gameState, setGameState] = useState(() => {
    const status = JSON.parse(window.localStorage.getItem("status"));
    if (status === "finished") {
      return "finished";
    } else if (status === "in progress") {
      return "in progress";
    } else {
      return "idle";
    }
  });

  useEffect(() => {
    console.log(players)
    console.log(gameState)
  }, [players, gameState]);

  function handleStartGame() {
    const table = window.localStorage.getItem("table");
    if (table) {
      window.localStorage.removeItem("table");
    }
    const playersForBackend = players.map((p) => {
      return { username: p, score: 0, bid: 0, bidsLost: 0 };
    });
    api.createGame(playersForBackend).then((res) => {
      console.log(res.data);
      window.localStorage.setItem(
        "cardsPerRound",
        JSON.stringify(res.data.cardsPerRound)
      );
      window.localStorage.setItem("gameId", res.data.id);
      window.localStorage.setItem("round", res.data.round);
      window.localStorage.setItem("status", JSON.stringify(res.data.status));
      window.localStorage.setItem("players", JSON.stringify(res.data.players));
      setGameState("in progress");
    });
  }

  function playAgain() {
    setGameState("finished")
    handleStartGame()
  }

  function backToForm() {
    setGameState("finished")
  }

  return gameState === "idle" || gameState === "finished" ? (
    <GameForm
      players={players}
      setPlayers={setPlayers}
      gameState={gameState}
      setGameState={setGameState}
      handleStartGame={handleStartGame}
    />
  ) : (
    <Scores
      setGameState={setGameState}
      playAgain={playAgain}
      backToForm={backToForm}
    />
  );
}

export default NewGame;
