/* eslint-disable react/prop-types */
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
import PlayerDash from "./PlayerDash";
import api from "../../../utils/api-client";
import { types } from "../../../utils/reducer";

function reducer(state, action) {
  console.log(state);
  switch (action.type) {
    case types.addBid: {
      let newState = [...state];
      newState[action.index] = {
        ...newState[action.index],
        bid: newState[action.index].bid + 1,
      };
      return newState;
    }
    case types.resetBid: {
      let newState = [...state];
      newState[action.index] = {
        ...newState[action.index],
        bid: 0,
      };
      return newState;
    }
    case types.addLost: {
      let newState = [...state];
      newState[action.index] = {
        ...newState[action.index],
        bidsLost: newState[action.index].bidsLost + 1,
      };
      return newState;
    }
    case types.resetLost: {
      let newState = [...state];
      newState[action.index] = {
        ...newState[action.index],
        bidsLost: 0,
      };
      return newState;
    }
    case types.clean: {
      let newState = [...state];
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
  const [cardsInCurrent, setCardsInCurrent] = useState(0);
  const [round, setRound] = useState(0);
  const [playersRound, dispatch] = useReducer(reducer, [...players]);

  useEffect(() => {
    const cards = window.localStorage.getItem("cardsInCurrent");
    const round = window.localStorage.getItem("round");
    setCardsInCurrent(cards);
    setRound(round);
  }, []);

  useEffect(() => {
    console.log(playersRound)
  }, [playersRound]);

  function nextRound() {
    const gameId = window.localStorage.getItem("gameId");

    api.nextRound(gameId, playersRound);
  }

  return (
    <>
      <Typography variant="h4">Ronda {round + 1}</Typography>
      <Typography variant="h4">Cartas {cardsInCurrent}</Typography>
      {playersRound.map((p, i) => {
        return (
          <PlayerDash
            player={p}
            key={i}
            index={i}
            dispatch={dispatch}
            types={types}
          />
        );
      })}

      <Button onClick={() => dispatch({ type: types.clean })}>Limpiar</Button>

      <Button onClick={nextRound}>Siguiente Ronda</Button>

      <Button
        onClick={() => {
          window.localStorage.removeItem("players");
          setGameState("idle");
        }}
      >
        Terminar partida
      </Button>
    </>
  );
}

export default Scores;
