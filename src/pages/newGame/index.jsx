/* eslint-disable no-unused-vars */
import { useState } from "react";
import GameForm from "./gameForm";
import Scores from "./scores";
import api from "../../utils/api-client";
import Swal from "sweetalert2";
import "./scores/css/scores.css"
import useAchievements from "../../components/achievements/useAchievements";

function NewGame() {
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
  const [loading, setLoading] = useState(false);
  
  function handleStartGame(players) {
    setLoading(true);
    const table = window.localStorage.getItem("table");
    if (table) {
      window.localStorage.removeItem("table");
    }
    const playersForBackend = players.map((p) => {
      return { username: p, score: 0, bid: 0, bidsLost: 0 };
    });
    api.createGame(playersForBackend).then((res) => {
      window.localStorage.setItem(
        "cardsPerRound",
        JSON.stringify(res.data.cardsPerRound)
      );
      window.localStorage.setItem("gameId", res.data.id);
      window.localStorage.setItem("round", res.data.round);
      window.localStorage.setItem("status", JSON.stringify(res.data.status));
      const players = window.localStorage.getItem("players");
      if (players) {
        window.localStorage.removeItem("players");
      }
      const playersWithHistory = res.data.players.map((item) => ({
        ...item,
        history: [],
      }));
      window.localStorage.setItem(
        "players",
        JSON.stringify(playersWithHistory)
      );
      setLoading(false);
      setGameState("in progress");
    });
  }

  function finishGame() {
    const gameId = window.localStorage.getItem("gameId");
    const user = window.localStorage.getItem("user");
    const table = JSON.parse(window.localStorage.getItem("table"));
    const players = JSON.parse(window.localStorage.getItem("players"));
    const winner = table[0].username;

    api
      .finishGame(players, gameId, user, winner)
      .then((res) => {
        const finalTable = JSON.parse(window.localStorage.getItem("table"))
        const winner = finalTable[0];
        Swal.fire({
          title: `Ganó ${winner.username} con ${winner.score} puntos`,
          width: 600,
          padding: '3em',
          customClass: {
            title: 'custom-title-color',
          },
          color: '#716add',
          background: '#eee url(https://res.cloudinary.com/dfknsvqer/image/upload/v1699022974/altisima/win_za9q0s.jpg)',
          confirmButtonText: 'Salir',
        }).then((result) => {
          if (result.isConfirmed) {
            backToForm();
          } 
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function playAgain(players) {
    setGameState("finished");
    handleStartGame(players);
  }

  function backToForm() {
    setGameState("finished");
    api
      .getAchievements()
      .then(res => {
        window.localStorage.setItem("achievements", JSON.stringify(res.data))
      })
  }

  return gameState === "idle" || gameState === "finished" ? (
    <GameForm
      gameState={gameState}
      setGameState={setGameState}
      handleStartGame={handleStartGame}
      loading={loading}
    />
  ) : (
    <Scores
      setGameState={setGameState}
      playAgain={playAgain}
      backToForm={backToForm}
      finishGame={finishGame}
    />
  );
}

export default NewGame;
