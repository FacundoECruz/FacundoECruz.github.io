/* eslint-disable react/prop-types */
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from 'react';
import PlayerDash from "./PlayerDash";
import api from "../../../utils/api-client";

const types = {
  addBid: "bid - add",
  resetBid: "bid - reset",
  addLost: "lost - add",
  resetLost: "lost - reset",
  clean: "round - clean",
};

function reducer(state, action) {
  switch (action.type) {
    case types.addBid: {
      return {
        ...state,
        bid: (state[action.index].bid += 1),
      };
    }
    case types.resetBid: {
      let newState = { ...state };
      newState[action.index].bid = 0;
      return newState;
    }
    case types.addLost: {
      return {
        ...state,
        bidsLost: (state[action.index].bidsLost += 1),
      };
    }
    case types.resetLost: {
      let newState = { ...state };
      newState[action.index].bidsLost = 0;
      return newState;
    }
    case types.clean: {
      let newState = { ...state };
      newState.map((p) => {
        p.bid = 0;
        p.bidsLost = 0;
      });
      return newState;
    }
    default:
      return state;
  }
}

function Scores({ players, setGameState }) {
  const [cardsInCurrent, setCardsInCurrent] = useState(0)
  const [round, setRound] = useState(0)
  const [playersRound, dispatch] = useReducer(reducer, players);

  useEffect(() => {
    const cards = window.localStorage.getItem("cardsInCurrent")
    const round = window.localStorage.getItem("round")
    setCardsInCurrent(cards)
    setRound(round)
  }, []);

  useEffect(() => {
    console.log(playersRound)
  }, [playersRound]);

  function nextRound() {
    const gameId = window.localStorage.getItem("gameId")
    
    api
      .nextRound(gameId, playersRound)
  }

  return (
    <>
      <Typography variant="h4">Ronda {round + 1}</Typography>
      <Typography variant="h4">Cartas {cardsInCurrent}</Typography>
      {players.map((p, i) => {
        return (
          <PlayerDash player={p} key={i} index={i} dispatch={dispatch} types={types}/>
        )
      })}

      <Button onClick={nextRound}>Siguiente Ronda</Button>

      <Button
        onClick={() => {
          window.localStorage.removeItem("players")
          setGameState("idle");
        }}
      >
        Terminar partida
      </Button>
    </>
  );
}

export default Scores;
