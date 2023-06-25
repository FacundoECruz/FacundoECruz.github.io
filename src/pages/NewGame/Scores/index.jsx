/* eslint-disable react/prop-types */
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import PlayerDash from "./PlayerDash";

function Scores({ players, setGameState }) {
  const [playersNames, setPlayersNames] = useState(players);
  const [cardsInCurrent, setCardsInCurrent] = useState(0)
  const [round, setRound] = useState(0)

  useEffect(() => {
    const cards = window.localStorage.getItem("cardsInCurrent")
    const round = window.localStorage.getItem("round")
    setCardsInCurrent(cards)
    setRound(round)
    window.localStorage.setItem("players", JSON.stringify(playersNames));
  }, [playersNames]);

  return (
    <>
      <Typography variant="h4">Ronda {round + 1}</Typography>
      <Typography variant="h4">Cartas {cardsInCurrent}</Typography>
      {players.map((p, i) => {
        return (
          <PlayerDash player={p} key={i}/>
        )
      })}

      <Button
        onClick={() => {
          window.localStorage.removeItem("players")
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
