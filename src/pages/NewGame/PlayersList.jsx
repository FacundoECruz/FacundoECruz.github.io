/* eslint-disable react/prop-types */
import { Box, List, ListItem, ListItemText, Button } from "@mui/material";

function PlayersList({ players }) {
  return (
    <Box sx={{ width: "50%" }}>
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
  );
}

export default PlayersList;
