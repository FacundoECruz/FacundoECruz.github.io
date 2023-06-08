import { useEffect, useState } from "react";
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
  Autocomplete,
} from "@mui/material";

function NewGame() {
  const [player, setPlayer] = useState("");
  const [players, setPlayers] = useState([]);
  const [options, setOptions] = useState([]);

  function handleChange(e, newValue) {
    setPlayer(newValue);
  }

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await api.getPlayers();
        setOptions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOptions();
  }, []);

  function addPlayer() {
    players.push(player.username)
    console.log(players)
    setPlayer("")
  }

  return (
    <>
      <Typography variant="h3" sx={{ mx: 1, my: 3 }}>
        Nueva Partida
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Autocomplete
          options={options}
          value={player}
          onChange={handleChange}
          getOptionLabel={(option) => (option ? option.username : "")}
          renderInput={(params) => (
            <TextField
              {...params}
              id="name"
              label="Nombre"
              type="text"
              variant="outlined"
              required
              sx={{ mx: 1 }}
            />
          )}
        />
        <Box sx={{ my: 2, mx: 1 }}>
          <Button onClick={addPlayer} variant="contained" sx={{ bgcolor: "green" }}>
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
