/* eslint-disable react/prop-types */
import { useState } from "react";
import NewGameForm from "./NewGameForm";
import PlayersList from "./PlayersList";
import ControlButtons from "./ControlButtons";
import AddPlayerToDb from "./AddPlayerToDb";
import { Box, Button, Grid, Typography } from "@mui/material";
import api from "../../../utils/api-client";

function GameForm({ setGameState, players, setPlayers }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerInputValue, setPlayerInputValue] = useState("");

  function addPlayer() {
    if (selectedPlayer) {
      setPlayers((prevPlayers) => [...prevPlayers, selectedPlayer.username]);
      setSelectedPlayer(null);
      setPlayerInputValue("");
    }
  }

  function removePlayer(player) {
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.filter((p) => p !== player);
      return updatedPlayers;
    });
  }

  function handleStartGame() {
    const playersForBackend = players.map((p) => {
      return { username: p, score: 0, bid: 0, bidsLost: 0 };
    });
    api.createGame(playersForBackend).then((res) => {
      console.log(res.data);
      window.localStorage.setItem("cardsInCurrent", res.data.cardsInCurrent)
      window.localStorage.setItem("gameId", res.data.id)
      window.localStorage.setItem("round", res.data.round)
      window.localStorage.setItem("status", res.data.status)
      window.localStorage.setItem("players", JSON.stringify(playersForBackend))
      setGameState("inProgress");
    });
  }

  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('https://res.cloudinary.com/dfknsvqer/image/upload/v1686777876/hin-bong-yeung-jF946mh5QrA-unsplash_ccwnix.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
        minHeight: "100vh",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
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
            <PlayersList
              players={players}
              setGameState={setGameState}
              removePlayer={removePlayer}
            />
          ) : null}
          {players.length > 2 ? (
            <Button
              sx={{
                width: "200px",
                color: "green",
                border: "1px solid green",
                "&:hover": {
                  transform: "translate(-1px, -1px)",
                },
              }}
              onClick={handleStartGame}
            >
              Empezar
            </Button>
          ) : null}
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
          sx={{ mt: 5, display: "flex", justifyContent: "center" }}
        >
          <AddPlayerToDb />
        </Grid>
      </Grid>
    </div>
  );
}

export default GameForm;
