/* eslint-disable react/prop-types */
import { Box, List, ListItem, ListItemText, Button, ListItemAvatar,Avatar } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function PlayersList({ players, setGameState }) {
  return (
    <Box sx={{ width: "50%" }}>
      {players.map((p) => {
        return (
          <List key={p} sx={{ bgcolor: "green" }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountBoxIcon sx={{bgcolor: "orange"}}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={p} secondary="****" />
            </ListItem>
          </List>
        );
      })}
      <Button onClick={() => setGameState("inProgress")}>Empezar</Button>
    </Box>
  );
}

export default PlayersList;

