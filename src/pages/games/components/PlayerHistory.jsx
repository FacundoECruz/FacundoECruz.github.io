import { Typography } from "@mui/material";

export function PlayerHistory({ player }) {
  return player.history.map((roundResult, index) => {
    if (roundResult > 0 && roundResult < 10) {
      return (
        <Typography
          key={index}
          sx={{ color: "green", fontSize: "small", mx: "5px" }}
        >
          {roundResult}
        </Typography>
      );
    } else if (roundResult > 9) {
      return (
        <Typography
          key={index}
          sx={{ color: "lightblue", fontSize: "small", mx: "5px" }}
        >
          {roundResult}
        </Typography>
      );
    } else {
      return (
        <Typography
          key={index}
          sx={{ color: "red", fontSize: "small", mx: "5px" }}
        >
          {roundResult}
        </Typography>
      );
    }
  });
}
