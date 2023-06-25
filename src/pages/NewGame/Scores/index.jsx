/* eslint-disable react/prop-types */
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import PlayerDash from "./PlayerDash";
import api from "../../../utils/api-client";

function Scores({ players, setGameState }) {
  const [playersNames, setPlayersNames] = useState(players);
  const [cardsInCurrent, setCardsInCurrent] = useState(0)
  const [round, setRound] = useState(0)
  const [playersRound, setPlayersRound] = useState(() => {
    players.map(p => {
      return {
        name: p,
        bid: 0,
        bidsLost: 0,
        score: 0,
      }
    })
  })

  useEffect(() => {
    const cards = window.localStorage.getItem("cardsInCurrent")
    const round = window.localStorage.getItem("round")
    setCardsInCurrent(cards)
    setRound(round)
    window.localStorage.setItem("players", JSON.stringify(playersNames));
  }, [playersNames]);

  function nextRound() {
    const gameId = window.localStorage.getItem("gameId")
    
    api
      .nextRound(gameId, playersRound)
  }

  return (
    <>
      <Typography variant="h4">Ronda {round + 1}</Typography>
      <Typography variant="h4">Cartas {cardsInCurrent}</Typography>
      {playersRound.map((p, i) => {
        return (
          <PlayerDash player={p} key={i} setPlayersRound={setPlayersRound} index={i}/>
        )
      })}

      <Button onClick={nextRound}>Siguiente Ronda</Button>

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
