/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

function ScoreBoard({ table }) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", mx: 2, mb: 3, }}
    >
      <Box sx={{ height: "60px", display: "flex", alignItems: "center" }}>
        <Typography variant="h5" sx={{color: "white"}}>Tabla de posiciones</Typography>
      </Box>
      {table.map((player) => {
        return (
          <ListItem key={player.username} sx={{ border: "1px solid white" }}>
            <ListItemAvatar>
              <Avatar alt={player.username} src={player.image} />
            </ListItemAvatar>
            <ListItemText sx={{ maxWidth: "50%", flexGrow: 1, color: "white" }}>
              <Typography
                variant="body1"
                sx={{ fontSize: "1.2rem", fontWeight: "700" }}
              >
                {player.username}
              </Typography>
            </ListItemText>
            <ListItemText sx={{ textAlign: "right", color: "white" }}>
              <Typography
                variant="body1"
                sx={{ fontSize: "1.4rem", fontWeight: "700" }}
              >
                {player.score}
              </Typography>
            </ListItemText>
          </ListItem>
        );
      })}
    </Box>
  );
}

export default ScoreBoard;
