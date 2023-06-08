import { useState } from "react";
import "../../stylesheets/NewGame.css";
import NewGameForm from "./NewGameForm";
import PlayersList from "./PlayersList";
import ControlButtons from "./ControlButtons";
import { Box, Typography } from "@mui/material";

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
    <>
      <Typography variant="h3" sx={{ mx: 1, my: 3 }}>
        Nueva Partida
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <NewGameForm
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          playerInputValue={playerInputValue}
          setPlayerInputValue={setPlayerInputValue}
        />
      </Box>

      <ControlButtons addPlayer={addPlayer} setPlayers={setPlayers}/>

      {players.length ? <PlayersList players={players} /> : null}
    </>
  );
}

export default NewGame;
