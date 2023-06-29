/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

function ScoreBoard({ table }) {
  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      {table.map((player) => {
        return (
          <ListItem key={player.username}>
            <ListItemAvatar>
              <Avatar alt={player.username} src={player.image} />
            </ListItemAvatar>
            <ListItemText>{player.username}</ListItemText>
            <ListItemText>{player.score}</ListItemText>
          </ListItem>
        );
      })}
    </Box>
  );
}

export default ScoreBoard;
