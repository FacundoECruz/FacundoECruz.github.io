import { useEffect, useState, useReducer } from "react";
import { scoresReducer as reducer } from "./scoresReducer";
import { types } from "../../../utils/reducerTypes";
import api from "../../../utils/api-client";
import Swal from "sweetalert2";

export function useScores() {
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
  const [roundStatus, setRoundStatus] = useState("idle");

  useEffect(() => {
    setCardsPerRound(JSON.parse(window.localStorage.getItem("cardsPerRound")));
    setRound(JSON.parse(window.localStorage.getItem("round")));
    setStatus(JSON.parse(window.localStorage.getItem("status")));
  }, [playersRound]);

  function nextRound() {
    setVarCheck(false);

    if (invalidRoundData()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Al menos uno tiene que perder",
      });
    } else {
      const gameId = window.localStorage.getItem("gameId");
      setRoundStatus("loading");
      api
        .nextRound(playersRound, gameId)
        .then((res) => {
          dispatch({
            type: types.nextRound,
            newState: res.data.newRoundState,
          });
          updateLocalStorageAfterRound(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function invalidRoundData() {
    const playersLost = playersRound.map((p) => {
      return p.bidsLost;
    });
    return playersLost.every((p) => p === 0);
  }

  function updateLocalStorageAfterRound(roundData) {
    window.localStorage.setItem("round", roundData.round);
    if (roundData.round < 10) {
      window.localStorage.setItem("status", JSON.stringify(roundData.status));
    } else {
      window.localStorage.setItem("status", JSON.stringify("finished"));
    }
    window.localStorage.setItem(
      "players",
      JSON.stringify(roundData.newRoundState)
    );
    updateTable(roundData.newRoundState);
  }

  function updateTable(table){
    const uiTable = table.map((p) => {
      const { username, score, image, history } = p;
      return {
        username: username,
        score: score,
        image: image,
        history: history,
      };
    });
    uiTable.sort((a, b) => b.score - a.score);
    window.localStorage.setItem("table", JSON.stringify(uiTable));
    setTable(uiTable);
    setRoundStatus("idle");
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
          const { username, score, image, history } = p;
          return {
            username: username,
            score: score,
            image: image,
            history: history,
          };
        });
        uiTable.sort((a, b) => b.score - a.score);
        window.localStorage.setItem("table", JSON.stringify(uiTable));
        setTable(uiTable);
      })
      .catch((err) => console.log(err));
  }

  return {
    cardsPerRound,
    round,
    status,
    table,
    setTable,
    dispatch,
    varCheck,
    setVarCheck,
    setRoundStatus,
    playersRound,
    roundStatus,
    nextRound,
    prevRound,
  };
}
