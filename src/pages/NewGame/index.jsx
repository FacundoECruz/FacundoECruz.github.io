import { useState } from "react";
import GameForm from "./GameForm";
import Scores from "./Scores";
// import { useEffect } from "react";

function NewGame() {
  const [players, setPlayers] = useState(() => {
    const storedPlayers = JSON.parse(window.localStorage.getItem("players"));
    if(storedPlayers === null){
      return []
    } else {
      return storedPlayers
    }
  });
  const [gameState, setGameState] = useState(() => {
    const storedPlayers = JSON.parse(window.localStorage.getItem("players"));
    if(storedPlayers === null) {
      return "idle"
    } else {
      return "inProgress"
    }
  })

  // useEffect(() => {
  //   console.log(players)
  // }, [players]);  

  return gameState === "idle" ? (
    <GameForm
      players={players}
      setPlayers={setPlayers}
      setGameState={setGameState}
    />
  ) : (
    <Scores setGameState={setGameState}/>
  );
}

export default NewGame;
