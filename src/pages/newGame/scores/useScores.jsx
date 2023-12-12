import { useEffect, useState, useReducer } from "react";
import { scoresReducer as reducer } from "./scoresReducer";
import { types } from "../../../utils/reducerTypes";
import api from "../../../utils/api-client";
import Swal from "sweetalert2";

export function useScores(backToForm) {
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
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    setCardsPerRound(JSON.parse(window.localStorage.getItem("cardsPerRound")));
    setRound(JSON.parse(window.localStorage.getItem("round")));
    setStatus(JSON.parse(window.localStorage.getItem("status")));
  }, [playersRound]);

  // NEXT ROUND

  function nextRound() {
    setVarCheck(false);
    if (invalidRoundData()) {
      invalidRoundAlert();
      
    } else {
      const gameId = window.localStorage.getItem("gameId");
      setRoundStatus("loading");
      api
        .authenticatedRequest(
          "/v1/games/next",
          "PUT",
          { playersRound, gameId },
          token
        )
        .then((res) => {
          dispatch({
            type: types.nextRound,
            newState: res.newRoundState,
          });
          updateLocalStorageAfterRound(res);
          if (res.round > 9) {
            finishGame();
          }
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

  function invalidRoundAlert() {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Al menos uno tiene que perder",
    }).then((result) => {
      if (result.isConfirmed) {
        setVarCheck(true)
      }
    });
  }

  function updateLocalStorageAfterRound(roundData) {
    window.localStorage.setItem("round", roundData.round);
    window.localStorage.setItem("status", JSON.stringify(roundData.status));
    window.localStorage.setItem(
      "players",
      JSON.stringify(roundData.newRoundState)
    );
    updateTable(roundData.newRoundState);
  }

  function updateTable(table) {
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

  function finishGame() {
    const finalTable = JSON.parse(window.localStorage.getItem("table"));
    const winner = finalTable[0];
    Swal.fire({
      title: `Ganó ${winner.username} con ${winner.score} puntos`,
      width: 600,
      padding: "3em",
      customClass: {
        title: "custom-title-color",
      },
      color: "#716add",
      background:
        "#eee url(https://res.cloudinary.com/dfknsvqer/image/upload/v1699022974/altisima/win_za9q0s.jpg)",
      confirmButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        exitGame();
      }
    });
  }

  function exitGame() {
    cleanupLocalStorage();
    updateAchievements();
  }

  function cleanupLocalStorage() {
    window.localStorage.removeItem("table");
    window.localStorage.removeItem("cardsPerRound");
    window.localStorage.removeItem("gameId");
    window.localStorage.removeItem("round");
    backToForm();
  }

  function updateAchievements() {
    api.getAchievements().then((res) => {
      window.localStorage.setItem("achievements", JSON.stringify(res.data));
    });
  }

  // PREV ROUND

  function prevRound() {
    setVarCheck(true);
    const gameIdString = window.localStorage.getItem("gameId");
    const gameId = {id: gameIdString};
    api
      .authenticatedRequest("/v1/games/prev", "PUT", gameId, token)
      .then((data) => {
        dispatch({ type: types.nextRound, newState: data.newRoundState });
        window.localStorage.setItem("round", data.round);
        window.localStorage.setItem("status", JSON.stringify(data.status));
        window.localStorage.setItem(
          "players",
          JSON.stringify(data.newRoundState)
        );
        const table = data.newRoundState;
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
