/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import ScoreBoard from "./components/ScoreBoard";
import CircularProgress from "@mui/material/CircularProgress";
import { useScores } from "./useScores";
import Header from "./components/Header";
import PlayerScoreEntry from "./components/PlayerScoreEntry";
import ScoreboardControlButtons from "./components/ScoreboardControlButtons";

function Scores({ setGameState, playAgain, backToForm }) {
  const {
    round,
    status,
    table,
    dispatch,
    varCheck,
    playersRound,
    roundStatus,
    prevRound,
    nextRound,
  } = useScores();

  function setPlayAgain() {
    const finishTable = [...table];
    const players = finishTable.map((p) => {
      return p.username;
    });
    console.log("***players in setPlayAgain***");
    console.log(players);
    playAgain(players);
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ bgcolor: "black", mt: "1px", padding: "5px", pb: 6 }}
    >
      <Grid item xs={12} md={6}>
        <Header
          round={round}
          table={table}
          varCheck={varCheck}
          setGameState={setGameState}
        />

        <PlayerScoreEntry playersRound={playersRound} dispatch={dispatch} />

        <ScoreboardControlButtons
          round={round}
          dispatch={dispatch}
          backToForm={backToForm}
          nextRound={nextRound}
          prevRound={prevRound}
          status={status}
          setPlayAgain={setPlayAgain}
        />
      </Grid>

      {table ? (
        <Grid item xs={12} md={6}>
          {roundStatus === "loading" ? (
            <CircularProgress />
          ) : (
            <ScoreBoard table={table} />
          )}
        </Grid>
      ) : null}
    </Grid>
  );
}

export default Scores;
