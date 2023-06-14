/* eslint-disable react/prop-types */
import { useState } from "react";
import NewGameForm from "./NewGameForm";
import PlayersList from "./PlayersList";
import ControlButtons from "./ControlButtons";
import AddPlayerToDb from "./AddPlayerToDb";
import { Box, Grid, Typography } from "@mui/material";

function GameForm({ setGameState }) {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerInputValue, setPlayerInputValue] = useState("");

  function addPlayer() {
    if (selectedPlayer) {
      setPlayers((prevPlayers) => [...prevPlayers, selectedPlayer.username]);
      setSelectedPlayer(null);
      setPlayerInputValue("");
    }
  }

  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dfknsvqer/image/upload/v1686777876/hin-bong-yeung-jF946mh5QrA-unsplash_ccwnix.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
        minHeight: "100vh",
      }}
    >
      <Grid container>
        <Grid
          item
          xl={8}
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            mt: 5,
          }}
        >
          <Typography variant="h5" sx={{ mx: 1, my: 3, color: "white" }}>
            Agregar Jugadores
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", width: "60%" }}>
            <NewGameForm
              selectedPlayer={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
              playerInputValue={playerInputValue}
              setPlayerInputValue={setPlayerInputValue}
            />
          </Box>

          <ControlButtons addPlayer={addPlayer} setPlayers={setPlayers} />

          {players.length ? (
            <PlayersList players={players} setGameState={setGameState} />
          ) : null}
        </Grid>
        <Grid item xl={3} xs={12} sx={{ mt: 5 }}>
          <AddPlayerToDb />
        </Grid>
      </Grid>
    </div>
  );
}

export default GameForm;
