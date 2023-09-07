/* eslint-disable react/prop-types */
import { Box, Card, CardContent, Typography } from "@mui/material";

function LittleGameCard({ game }) {
  const parts = game.date.split("GMT");
  const gameDate = parts[0].trim();

  const finalResult = game.results[9].sort((a, b) => b.score - a.score);

  return (
    <Card sx={{bgcolor: "black"}}>
      <CardContent sx={{ width: "100%", display: "column", flexDirection: "row" }}>
        <Typography sx={{borderBottom: "1px solid white", color: "white"}}>{gameDate}</Typography>
        {finalResult.map((player, i) => {
          if(i === 0) {
            return (
              <Box key={i} sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography sx={{color: "green"}}>{player.username}</Typography>
                <Typography sx={{color: "green"}}>{player.score}</Typography>
              </Box>
            );
          } else {
            return (
              <Box key={i} sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography sx={{color: "white"}}>{player.username}</Typography>
                <Typography sx={{color: "white"}}>{player.score}</Typography>
              </Box>
            );
          }
        })}
      </CardContent>
    </Card>
  );
}

export default LittleGameCard;
