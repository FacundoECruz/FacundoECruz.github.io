import { useState } from "react";
import "../../stylesheets/NewGame.css";
import { Box, Button, TextField } from "@mui/material";

function NewGame() {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    players.push(name);
    setName("");
    console.log(players);
  }

  return (
    <>
      <h1>New Game page</h1>
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          id="text"
          label="Nombre"
          type="text"
          variant="outlined"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{mx: 1}}
        />
        <Box sx={{my: 2, mx: 1}}>
          <Button type="submit" variant="contained" sx={{ bgcolor: "green" }}>
            Agregar
          </Button>
          <Button onClick={() => setPlayers([])} variant="contained">
            Clean
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default NewGame;
