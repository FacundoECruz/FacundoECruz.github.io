/* eslint-disable react/prop-types */
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function PlayerBox({ players, removePlayer }) {

  function handleRemovePlayer(player) {
    removePlayer(player);
  }

  return (
    <Box sx={{ width: "80%" }}>
      {players.map((p) => {
        return (
          <List
            key={p}
            sx={{
              bgcolor: "transparent",
              border: "1px solid white",
              my: "2px",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "translate(-5px, -5px)",
              },
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountBoxIcon sx={{ bgcolor: "orange" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontSize: "20px" }}>
                    {p}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body1"
                    sx={{ color: "yellow", fontSize: "20px" }}
                  >
                    ***
                  </Typography>
                }
                sx={{ color: "white", fontSize: "90px" }}
              />
              <IconButton
                edge="end"
                aria-label="Eliminar"
                onClick={() => handleRemovePlayer(p)}
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "orange",
                  },
                }}
              >
                <HighlightOffIcon />
              </IconButton>
            </ListItem>
          </List>
        );
      })}
    </Box>
  );
}

export default PlayerBox;
