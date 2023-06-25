import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Scores({players, setGameState}) {

  const [playersNames, setPlayersNames] = useState(players)

  useEffect(() => {
    window.localStorage.setItem("players", JSON.stringify(playersNames))
  }, [playersNames]);

  return ( 
    <>
    <h1>Scores</h1>
    <p>{players[0]}</p>
    <Button onClick={() => {
      setPlayersNames([])
      setGameState("idle")
      }}>Terminar partida</Button>
    </>
   );
}

export default Scores;