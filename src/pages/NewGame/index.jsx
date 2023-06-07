import { useState } from "react";
import api from "../../utils/api-client";
import "../../stylesheets/NewGame.css";
import { Box, Button, TextField } from "@mui/material";

function NewGame() {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);

  async function handleChange(e) {
    setName(e.target.value)
    // const allPlayers = await api.getPlayers()
    // console.log(allPlayers)
  }

  return (
    <>
      <h1>New Game page</h1>
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          id="text"
          label="Nombre"
          type="text"
          variant="outlined"
          required
          value={name}
          onChange={handleChange}
          sx={{mx: 1}}
        />
        <Box sx={{my: 2, mx: 1}}>
          <Button variant="contained" sx={{ bgcolor: "green" }}>
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
