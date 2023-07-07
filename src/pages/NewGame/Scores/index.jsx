/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
import PlayerDash from "./PlayerDash";
import api from "../../../utils/api-client";
import { types } from "../../../utils/reducer";
import ScoreBoard from "./ScoreBoard";

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

function Scores({ setGameState, playAgain, backToForm }) {
  const [cardsPerRound, setCardsPerRound] = useState([]);
  const [round, setRound] = useState(null);
  const [status, setStatus] = useState(null);
  const [table, setTable] = useState(
    () => JSON.parse(window.localStorage.getItem("table")) || []
  );
  const [playersRound, dispatch] = useReducer(reducer, null, () =>
    JSON.parse(window.localStorage.getItem("players"))
  );
  const [varCheck, setVarCheck] = useState(false);
  const dashBoardWidth = "40%";

  useEffect(() => {
    setCardsPerRound(JSON.parse(window.localStorage.getItem("cardsPerRound")));
    setRound(JSON.parse(window.localStorage.getItem("round")));
    setStatus(JSON.parse(window.localStorage.getItem("status")));
    console.log(playersRound);
  }, [playersRound]);

  // useEffect(() => {
  //   console.log("******RONDAAAAAA********");
  //   console.log("***round***");
  //   console.log(round);
  //   console.log("***cardsInCurrent***");
  //   console.log(cardsPerRound[round - 1]);
  //   console.log("***status***");
  //   console.log(status);
  //   console.log("***table***");
  //   console.log(table);
  // }, [cardsPerRound, round, status, table]);

  function nextRound() {
    setVarCheck(false);
    const playersLost = playersRound.map((p) => {
      return p.bidsLost;
    });
    const invalidRoundData = playersLost.every((p) => p === 0);
    if (invalidRoundData) {
      alert(
        "No pueden ganar todos en una misma ronda, alguien tiene que perder!"
      );
    } else {
      const gameId = window.localStorage.getItem("gameId");

      api
        .nextRound(playersRound, gameId)
        .then((res) => {
          dispatch({ type: types.nextRound, newState: res.data.newRoundState });
          window.localStorage.setItem("round", res.data.round);
          window.localStorage.setItem(
            "status",
            JSON.stringify(res.data.status)
          );
          window.localStorage.setItem(
            "players",
            JSON.stringify(res.data.newRoundState)
          );
          const table = res.data.newRoundState;
          const uiTable = table.map((p) => {
            const { username, score, image } = p;
            return { username: username, score: score, image: image };
          });
          uiTable.sort((a, b) => b.score - a.score);
          window.localStorage.setItem("table", JSON.stringify(uiTable));
          setTable(uiTable);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function prevRound() {
    setVarCheck(true);
    const gameId = window.localStorage.getItem("gameId");
    const currentRound = window.localStorage.getItem("round");
    api
      .prevRound(currentRound, gameId)
      .then((res) => {
        dispatch({ type: types.nextRound, newState: res.data.newRoundState });
        window.localStorage.setItem("round", res.data.round);
        window.localStorage.setItem("status", JSON.stringify(res.data.status));
        window.localStorage.setItem(
          "players",
          JSON.stringify(res.data.newRoundState)
        );
        const table = res.data.newRoundState;
        const uiTable = table.map((p) => {
          const { username, score, image } = p;
          return { username: username, score: score, image: image };
        });
        uiTable.sort((a, b) => b.score - a.score);
        window.localStorage.setItem("table", JSON.stringify(uiTable));
        setTable(uiTable);
      })
      .catch((err) => console.log(err));
  }

  function finishGame() {
    const gameId = window.localStorage.getItem("gameId");
    const user = window.localStorage.getItem("user");

    api
      .finishGame(playersRound, gameId, user)
      .then((res) => {
        const { newRoundState } = res.data;
        dispatch({ type: types.nextRound, newState: newRoundState });
        window.localStorage.setItem("status", JSON.stringify(res.data.status));
        window.localStorage.setItem(
          "players",
          JSON.stringify(res.data.newRoundState)
        );
        const table = res.data.newRoundState;
        const uiTable = table.map((p) => {
          const { username, score, image } = p;
          return { username: username, score: score, image: image };
        });
        uiTable.sort((a, b) => b.score - a.score);
        window.localStorage.setItem("table", JSON.stringify(uiTable));
        setTable(uiTable);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ width: "40%" }}>
        {status === "finished" ? (
          <Box>
            <Typography>Partida terminada</Typography>
            <Typography>
              Gana {table[0].username} con {table[0].score} puntos!
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Typography variant="h4" sx={{ width: "45%" }}>
              Ronda {parseInt(round)}
            </Typography>
            <Typography variant="h4" sx={{ width: "45%" }}>
              Cartas {cardsPerRound[round - 1]}
            </Typography>
            {varCheck ? (
              <Box sx={{ width: "25%" }}>
                <img
                  src="https://res.cloudinary.com/dfknsvqer/image/upload/v1688731292/var_babqf8.jpg"
                  alt="pitana-var"
                  style={{ width: "50px", height: "50px" }}
                />
              </Box>
            ) : null}
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
            <Button onClick={() => backToForm()}>Volver al form</Button>
          )}

          {round < 9 ? (
            <Button onClick={nextRound}>Siguiente Ronda</Button>
          ) : round === 9 && status === "in progress" ? (
            <Button onClick={finishGame}>Finalizar</Button>
          ) : (
            <Button onClick={() => playAgain()}>Jugar de nuevo</Button>
          )}

          <Button
            onClick={() => {
              setGameState("finished");
              window.localStorage.removeItem("cardsPerRound");
              window.localStorage.removeItem("gameId");
              window.localStorage.removeItem("round");
              window.localStorage.setItem("status", JSON.stringify("finished"));
            }}
            sx={{ color: "red" }}
          >
            Terminar partida
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "purple" }}
            onClick={() => prevRound()}
            disabled={round === 1}
          >
            Volver
          </Button>
        </Box>
      </Box>

      {table ? (
        <Box sx={{ width: "40%" }}>
          <ScoreBoard table={table} />
        </Box>
      ) : null}
    </Box>
  );
}

export default Scores;
