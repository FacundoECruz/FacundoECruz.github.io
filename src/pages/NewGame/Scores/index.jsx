/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
import PlayerDash from "./PlayerDash";
import api from "../../../utils/api-client";
import { types } from "../../../utils/reducer";
import ScoreBoard from "./ScoreBoard";
import UndoIcon from '@mui/icons-material/Undo';

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
          if (res.data.round < 10) {
            window.localStorage.setItem(
              "status",
              JSON.stringify(res.data.status)
            );
          } else {
            window.localStorage.setItem("status", JSON.stringify("finished"));
          }
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
    api
      .prevRound(gameId)
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {round > 9 ? (
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
              justifyContent: "space-between",
              alignItems: "center",
              height: "60px",
              boxSizing: "border-box",
            }}
          >
            <Typography variant="h4" mr={2}>
              Ronda {parseInt(round)}
            </Typography>
            <Typography variant="h4" mr={3}>
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
            {round < 10 ? (
            <Button
              onClick={() => {
                setGameState("finished");
                window.localStorage.removeItem("cardsPerRound");
                window.localStorage.removeItem("gameId");
                window.localStorage.removeItem("round");
                window.localStorage.setItem(
                  "status",
                  JSON.stringify("finished")
                );
              }}
              sx={{ color: "red", width: "30px", height: "30px", fontSize: "8px", border: "1px solid red"}}
            >
              Terminar partida
            </Button>
          ) : null}
          </Box>
        )}

        <Box mb={1}>
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
          {round < 10 ? (
            <Button
              variant="contained"
              sx={{ bgcolor: "lightblue", color: "black" }}
              onClick={() => dispatch({ type: types.clean })}
            >
              Limpiar
            </Button>
          ) : (
            <Button onClick={() => backToForm()}>Volver al form</Button>
          )}

          {round < 9 ? (
            <Button onClick={nextRound} variant="contained">Siguiente Ronda</Button>
          ) : round === 9 && status === "in progress" ? (
            <Button onClick={nextRound}>Finalizar</Button>
          ) : (
            <Button onClick={() => playAgain()}>Jugar de nuevo</Button>
          )}

          

          <Button
            variant="contained"
            sx={{ bgcolor: "purple" }}
            onClick={() => prevRound()}
            disabled={round === 1}
          >
            <UndoIcon />
          </Button>
        </Box>
      </Grid>

      {table ? (
        <Grid item xs={12} md={6}>
          <ScoreBoard table={table} />
        </Grid>
      ) : null}
    </Grid>
  );
}

export default Scores;
