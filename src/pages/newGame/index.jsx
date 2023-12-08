/* eslint-disable no-unused-vars */
import { useState } from "react";
import GameForm from "./gameForm";
import Scores from "./scores";
import api from "../../utils/api-client";
import "./scores/css/scores.css"

function NewGame() {
  const [loading, setLoading] = useState(false);
  const [gameState, setGameState] = useState(() => {
    const status = JSON.parse(window.localStorage.getItem("status"));
    if (status) {
      return status;
    } else {
      return "idle";
    }
  });
  
  // Maneja el inicio del juego
  async function handleStartGame(players) {
    setLoading(true);
    const playersForBackend = players.map((p) => {
      return { username: p, score: 0, bid: 0, bidsLost: 0 };
    });
    const token = window.localStorage.getItem("token");
    const gameData = await api.authenticatedRequest(
      "/v1/games",
      "POST",
      playersForBackend,
      token
    );
    saveGameDataInLocalStorage(gameData)
      removeOldPlayersFromLocalStorage()
      setCurrentPlayersInLocalStorage(gameData)
      setLoading(false);
      setGameState(gameData.status);
    // api.createGame(playersForBackend).then((res) => {
    //   saveGameDataInLocalStorage(res.data)
    //   removeOldPlayersFromLocalStorage()
    //   setCurrentPlayersInLocalStorage(res.data)
    //   setLoading(false);
    //   setGameState(res.data.status);
    // });
  }

  function saveGameDataInLocalStorage(data){
    window.localStorage.setItem(
      "cardsPerRound",
      JSON.stringify(data.cardsPerRound)
    );
    window.localStorage.setItem("gameId", data.id);
    window.localStorage.setItem("round", data.round);
    window.localStorage.setItem("status", JSON.stringify(data.status));
  }

  function removeOldPlayersFromLocalStorage(){
    const players = window.localStorage.getItem("players");
      if (players) {
        window.localStorage.removeItem("players");
      }
  }

  function setCurrentPlayersInLocalStorage(data){
    const playersWithHistory = data.players.map((item) => ({
      ...item,
      history: [],
    }));
    window.localStorage.setItem(
      "players",
      JSON.stringify(playersWithHistory)
    );
  }

  //Jugar de nuevo con los mismos jugadores
  function playAgain(players) {
    setGameState("finished");
    handleStartGame(players);
  }

  //Volver al formulario una vez terminada la partida
  function backToForm() {
    setGameState("finished"); 
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
    />
  );
}

export default NewGame;
