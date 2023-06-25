/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import PlayerDash from "./PlayerDash";

function Scores({ players, setGameState }) {
  const [playersNames, setPlayersNames] = useState(players);

  useEffect(() => {
    window.localStorage.setItem("players", JSON.stringify(playersNames));
  }, [playersNames]);

  return (
    <>
      {players.map((p, i) => {
        return (
          <PlayerDash player={p} key={i}/>
        )
      })}

      <Button
        onClick={() => {
          setPlayersNames([]);
          setGameState("idle");
        }}
      >
        Terminar partida
      </Button>
    </>
  );
}

export default Scores;
