/* eslint-disable react/prop-types */
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CloseIcon from "@mui/icons-material/Close"

function PlayersList({ players, setGameState, removePlayer }) {

  function handleRemovePlayer(player){
    removePlayer(player);
  }

  return (
    <Box sx={{ width: "50%" }}>
      {players.map((p) => {
        return (
          <List key={p} sx={{ bgcolor: "transparent" }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountBoxIcon sx={{ bgcolor: "orange" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={p}
                secondary={
                  <Typography variant="body2" sx={{ color: "yellow" }}>
                    ***
                  </Typography>
                }
                sx={{ color: "white" }}
              />
              <IconButton
                edge="end"
                aria-label="Eliminar"
                onClick={() => handleRemovePlayer(p)}
              >
                <CloseIcon />
              </IconButton>
            </ListItem>
          </List>
        );
      })}
      {players.length > 2 ? (
        <Button sx={{color: "white"}} onClick={() => setGameState("inProgress")}>Empezar</Button>
      ) : null}
    </Box>
  );
}

export default PlayersList;
