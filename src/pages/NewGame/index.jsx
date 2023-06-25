import { useState } from "react";
import GameForm from "./GameForm";
import Scores from "./Scores";
import { useEffect } from "react";

function NewGame() {
  const [players, setPlayers] = useState(() => {
    const storedPlayers = JSON.parse(window.localStorage.getItem("players"));
    if(storedPlayers.length){
      return storedPlayers
    } else {
      return []
    }
  });
  const [gameState, setGameState] = useState(() => {
    const storedPlayers = JSON.parse(window.localStorage.getItem("players"));
    if(storedPlayers.length) {
      return "inProgress"
    } else{
      return "idle"
    }
  })

  useEffect(() => {
    console.log(players)
      console.log(gameState)
  }, [gameState, players]);

  return gameState === "idle" ? (
    <GameForm
      players={players}
      setPlayers={setPlayers}
      setGameState={setGameState}
    />
  ) : (
    <Scores players={players} setGameState={setGameState}/>
  );
}

export default NewGame;
