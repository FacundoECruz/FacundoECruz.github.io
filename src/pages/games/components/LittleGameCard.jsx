/* eslint-disable react/prop-types */
import { Box, Card, CardContent, Typography } from "@mui/material";

function LittleGameCard({ game }) {
  const parts = game.date.split("GMT");
  const gameDate = parts[0].trim();

  const finalResult = game.results[9];

  return (
    <Card >
      <CardContent sx={{ width: "100%", display: "column", flexDirection: "row" }}>
        <Typography>{gameDate}</Typography>
        {finalResult.map((player, i) => {
          return (
            <Box key={i}>
              <Typography>{player.username}</Typography>
              <Typography>{player.score}</Typography>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default LittleGameCard;
