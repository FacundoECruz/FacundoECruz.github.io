import { useState } from "react";
import api from "../../utils/api-client";
import "../../stylesheets/NewGame.css";
import {
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

function NewGame() {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);

  async function handleChange(e) {
    setName(e.target.value);
    const matchPlayers = await api.searchUser(name)
    console.log(matchPlayers)
  }

  function addPlayer(e) {
    e.preventDefault();
    players.push(name);
    setName("");
  }

  return (
    <>
      <Typography variant="h3" sx={{mx: 1, my: 3}}>Nueva Partida</Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
        component="form"
        onSubmit={addPlayer}
      >
        <TextField
          id="text"
          label="Nombre"
          type="text"
          variant="outlined"
          required
          value={name}
          onChange={handleChange}
          sx={{ mx: 1 }}
        />
        <Box sx={{ my: 2, mx: 1 }}>
          <Button type="submit" variant="contained" sx={{ bgcolor: "green" }}>
            Agregar
          </Button>
          <Button onClick={() => setPlayers([])} variant="contained">
            Clean
          </Button>
        </Box>
      </Box>

      {players.length ? (
        <Box>
          {players.map((p) => {
            return (
              <List key={p} sx={{ bgcolor: "green" }}>
                <ListItem>
                  <ListItemText>{p}</ListItemText>
                </ListItem>
              </List>
            );
          })} 
          <Button>Empezar</Button>
        </Box>
      ) : null}
    </>
  );
}

export default NewGame;
