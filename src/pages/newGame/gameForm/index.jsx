/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import NewGameForm from "./NewGameForm";
import PlayerBox from "./PlayersList";
import ControlButtons from "./ControlButtons";
import { Box, Button, Grid, Typography } from "@mui/material";
import api from "../../../utils/api-client";

function GameForm({ setGameState, handleStartGame }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerInputValue, setPlayerInputValue] = useState("");
  const [players, setPlayers] = useState(() => {
    const storedPlayers = JSON.parse(window.localStorage.getItem("players"));
    if (storedPlayers === null) {
      return [];
    } else {
      let players = storedPlayers.map((p) => {
        return p.username;
      });
      return players;
    }
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  // useEffect(() => {
  //   console.log("***players en el estado de GameForm***")
  //   console.log(players)
  // }, [players]);

  async function fetchOptions() {
    try {
      const playersResponse = await api.getPlayers();
      setOptions(playersResponse.data);
    } catch (error) {
      console.error(error);
    }
  }

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

  function addPlayerToDbAndGame(newPlayer) {
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
  }

  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('https://res.cloudinary.com/dfknsvqer/image/upload/v1695065768/fondo_newGame_hts4p6.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
        minHeight: "85vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { md: "60%", xs: "100%" },
          marginLeft: "auto",
          marginRight: "auto",
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
            options={options}
            addPlayerToDbAndGame={addPlayerToDbAndGame}
            fetchOptions={fetchOptions}
          />
        </Box>

        <ControlButtons addPlayer={addPlayer} setPlayers={setPlayers} />

        {players.length ? (
          <PlayerBox
            players={players}
            setGameState={setGameState}
            removePlayer={removePlayer}
          />
        ) : null}
        {players.length > 2 ? (
          <Button
            sx={{
              width: "200px",
              color: "white",
              bgcolor: "green",
              border: "1px solid green",
              "&:hover": {
                transform: "translate(-1px, -1px)",
                bgcolor: "white",
                color: "black",
              },
            }}
            variant="contained"
            onClick={() => handleStartGame(players)}
          >
            Comenzar
          </Button>
        ) : null}
      </Box>
    </div>
  );
}

export default GameForm;
