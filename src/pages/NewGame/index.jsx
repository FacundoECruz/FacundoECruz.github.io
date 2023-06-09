import { useState } from "react";
import GameForm from "./GameForm";
import Scores from "./Scores"

function NewGame() {
  const [gameState, setGameState] = useState("idle");

  return gameState === "idle" ? <GameForm setGameState={setGameState}/> : <Scores />;
}

export default NewGame;
