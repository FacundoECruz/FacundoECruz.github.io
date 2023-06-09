import { useState } from "react";
import "../../stylesheets/NewGame.css";
import NewGameForm from "./NewGameForm";
import PlayersList from "./PlayersList";
import ControlButtons from "./ControlButtons";
import AddPlayerToDb from "./AddPlayerToDb";
import { Box, Grid, Typography } from "@mui/material";

function NewGame() {
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
    <Grid container spacing={4}>
      <Grid item xl={8}>
        <Box sx={{display: "flex", alignItems: "center", flexDirection:"column", border: "1px solid black"}}>
          <Typography variant="h3" sx={{ mx: 1, my: 3 }}>
            Nueva Partida
          </Typography>
          <Typography variant="h5" sx={{ mx: 1, my: 3 }}>
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

        {players.length ? <PlayersList players={players} /> : null}
        </Box>
      </Grid>
      <Grid item xl={3}>
        <AddPlayerToDb />
      </Grid>
    </Grid>
  );
}

export default NewGame;
