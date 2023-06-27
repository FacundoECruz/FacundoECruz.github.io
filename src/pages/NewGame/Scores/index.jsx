/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
import PlayerDash from "./PlayerDash";
import api from "../../../utils/api-client";
import { types } from "../../../utils/reducer";

function reducer(state, action) {
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
    case types.nextRound: {
      let newState = action.newState;
      return newState; 
    } 
    default:
      return state;
  }
}

function Scores({ players, setGameState }) {
  const [cardsInCurrent, setCardsInCurrent] = useState(() => window.localStorage.getItem("cardsInCurrent") || null);
  const [round, setRound] = useState(() => window.localStorage.getItem("round") || 0);
  const [playersRound, dispatch] = useReducer(reducer, [...players]);
  const dashBoardWidth = "40%";

  // useEffect(() => {
  //   console.log("***Scores > round***")
  //   console.log(round)
  //   console.log("***Scores > cardsInCurrent***")
  //   console.log(cardsInCurrent)
  //   console.log("*********")
  // }, [round, cardsInCurrent]);

  // useEffect(() => {
  //   console.log("***Scores>playersRound***")
  //   console.log(playersRound)
  //   console.log("******")
  // }, [playersRound]);

  function nextRound() {
    const gameId = window.localStorage.getItem("gameId");

    api
      .nextRound(playersRound, gameId, round)
      .then((res)=>{
        console.log(res)
        dispatch({ type: types.nextRound, newState: res.data.newRoundState })
        window.localStorage.setItem("cardsInCurrent", res.data.cardsInCurrent)
        window.localStorage.setItem("round", res.data.round)
      })
      .catch((err) => {console.log(err)})
  }

  return (
    <>
      <Box>
        <Typography variant="h4">Ronda {parseInt(round) + 1}</Typography>
        <Typography variant="h4">Cartas {cardsInCurrent}</Typography>
      </Box>
      <Box>
        {playersRound.map((p, i) => {
          return (
            <PlayerDash
              player={p}
              key={i}
              index={i}
              dispatch={dispatch}
              types={types}
              width={dashBoardWidth}
            />
          );
        })}
      </Box>
      <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: dashBoardWidth}}>
        <Button
          variant="contained"
          sx={{ bgcolor: "lightblue" }}
          onClick={() => dispatch({ type: types.clean })}
        >
          Limpiar
        </Button>
        <Button onClick={nextRound}>Siguiente Ronda</Button>
        <Button
          onClick={() => {
            window.localStorage.removeItem("players");
            window.localStorage.removeItem("gameId");
            window.localStorage.removeItem("cardsInCurrent");
            window.localStorage.removeItem("round");
            setGameState("idle");
          }}
          sx={{ color: "red" }}
        >
          Terminar partida
        </Button>
      </Box>
    </>
  );
}

export default Scores;
