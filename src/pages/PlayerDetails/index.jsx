import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../utils/api-client.js";
import PlayerCard from "../../components/PlayerCard";
import { Box } from "@mui/material";
import PlayerStatics from "./components/PlayerStatics.jsx";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import PolylineIcon from '@mui/icons-material/Polyline';
import SportsScoreIcon from '@mui/icons-material/SportsScore';

function PlayerDetails() {
  const { username } = useParams();

  const [player, setPlayer] = useState(null);

  useEffect(() => {
    console.log(player)
    api
      .getPlayer(username)
      .then((response) => {
        const [player] = response.data
        setPlayer(player)
      })
      .catch((error) => console.log(error));
  }, [username, player]);

  return (
    <>
      {player ? (
        <Box>
          <PlayerCard image={player.image} username={player.username} />
          <PlayerStatics
            icon={<SportsEsportsIcon sx={{ bgcolor: "purple" }} />}
            value={player.gamesPlayed}
            description="Partidas jugadas"
          />
          <PlayerStatics
            icon={<MilitaryTechIcon sx={{ bgcolor: "orange" }}/>}
            value={player.gamesWon}
            description="Partidas Ganadas"
          />
          <PlayerStatics
            icon={<PolylineIcon sx={{ bgcolor: "green" }}/>}
            value={player.createdGames}
            description="Partidas Creadas"
          />
          <PlayerStatics
            icon={<SportsScoreIcon sx={{ bgcolor: "blue" }}/>}
            value={player.totalScore / player.gamesPlayed}
            description="Promedio por Partida"
          />
        </Box>
      ) : null}
    </>
  );
}

export default PlayerDetails;

{
  /* <p>Played Games: {player.gamesPlayed}</p>
<p>Won Games: {player.gamesWon}</p>
<p>Created Games: {player.createdGames}</p>
<p>Total Score: {player.totalScore}</p>
<p>Average: {player.totalScore / player.gamesPlayed}</p> */
}
