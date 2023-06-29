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

function Scores({ setGameState }) {
  const [cardsPerRound, setCardsPerRound] = useState([]);
  const [round, setRound] = useState(null);
  const [status, setStatus] = useState(null);
  const [playersRound, dispatch] = useReducer(reducer, null, () =>
    JSON.parse(window.localStorage.getItem("players"))
  );
  const dashBoardWidth = "40%";

  useEffect(() => {
    setCardsPerRound(JSON.parse(window.localStorage.getItem("cardsPerRound")));
    setRound(JSON.parse(window.localStorage.getItem("round")));
    setStatus(window.localStorage.getItem("status"));
  }, [playersRound]);

  useEffect(() => {
    console.log("******RONDAAAAAA********");
    console.log("***round***");
    console.log(round);
    console.log("***cardsInCurrent***");
    console.log(cardsPerRound[round - 1]);
    console.log("***status***");
    console.log(status);
  }, [cardsPerRound, round, status]);

  function nextRound() {
    const gameId = window.localStorage.getItem("gameId");

    api
      .nextRound(playersRound, gameId)
      .then((res) => {
        console.log(res);
        dispatch({ type: types.nextRound, newState: res.data.newRoundState });
        window.localStorage.setItem("round", res.data.round);
        window.localStorage.setItem("status", JSON.stringify(res.data.status));
        window.localStorage.setItem("players", JSON.stringify(res.data.newRoundState));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function finishGame() {
    const gameId = window.localStorage.getItem("gameId")
    const user = window.localStorage.getItem("user")

    api
      .finishGame(playersRound, gameId, user)
      .then((res) => {
        console.log(res)
        const {newRoundState, winner} = res.data;
        dispatch({ type: types.nextRound, newState: newRoundState,});
        window.localStorage.setItem("status", res.data.status)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      {status === "finished" ? (
        <Box>
          <Typography>Partida terminada</Typography>
          {/* Arreglar esto porque displayea el primero del array por ahora, no el primero 
          de la tabla, igual no va a hacer falta una vez que este la tabla */}
          <Typography>Gana {playersRound[0].username} con {playersRound[0].score} puntos!</Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="h4">Ronda {parseInt(round)}</Typography>
          <Typography variant="h4">
            Cartas {cardsPerRound[round - 1]}
          </Typography>
        </Box>
      )}

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: dashBoardWidth,
        }}
      >
        {status === "in progress" ? (
          <Button
            variant="contained"
            sx={{ bgcolor: "lightblue" }}
            onClick={() => dispatch({ type: types.clean })}
          >
            Limpiar
          </Button>
        ) : (
          <Button onClick={() => console.log("Volver a inicio")}>
            Volver a inicio
          </Button>
        )}

        {round < 9 ? (<Button onClick={nextRound}>
            Siguiente Ronda
          </Button>) : (<Button onClick={finishGame}>
            Finalizar
          </Button>)}

        <Button
          onClick={() => {
            window.localStorage.removeItem("players");
            window.localStorage.removeItem("gameId");
            window.localStorage.removeItem("cardsPerRound");
            window.localStorage.removeItem("round");
            window.localStorage.removeItem("status");
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
