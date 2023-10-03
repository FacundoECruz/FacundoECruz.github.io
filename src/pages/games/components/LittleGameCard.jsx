/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { WinnerAccordion } from "./WinnerAccordion";
import { PlayerAccordion } from "./PlayersAccordion";


function LittleGameCard({ game }) {
  const parts = game.date.split("GMT");
  const gameDate = parts[0].trim();

  const finalResult = game.currentResults.sort((a, b) => b.score - a.score);

  return (
    <Card sx={{ bgcolor: "black" }}>
      <CardContent
        sx={{ width: "100%", display: "column", flexDirection: "row" }}
      >
        <Typography sx={{ borderBottom: "1px solid white", color: "white" }}>
          {gameDate}
        </Typography>
        {finalResult.map((player, i) => {
          if (i === 0) {
            return <WinnerAccordion player={player} key={i}/>;
          } else {
            return <PlayerAccordion player={player} key={i}/>;
          }
        })}
      </CardContent>
    </Card>
  );
}

export default LittleGameCard;
