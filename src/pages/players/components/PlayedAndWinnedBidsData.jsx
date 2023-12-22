/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

function PlayedAndWinnedBidsData({ player, playerData }) {
  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    border: "1px solid white",
    padding: "7px",
    marginBottom: "10px",
  };

  const numberStyle = {
    color: "white",
    padding: "8px",
    fontSize: "18px",
    fontWeight: "400",
  };

  const typographyStyle = { color: "white", fontSize: "14px" };

  return (
    <Box sx={containerStyle}>
      <Box>
        <Typography sx={numberStyle}>{player.gamesPlayed}</Typography>
        <Typography sx={typographyStyle}>Partidas</Typography>
        <Typography sx={typographyStyle}>jugadas</Typography>
      </Box>
      <Box>
        <Typography sx={numberStyle}>
          {playerData.playedGames !== 0 ? playerData.totalExtraScore : 0}
        </Typography>
        <Typography sx={typographyStyle}>Apuestas</Typography>
        <Typography sx={typographyStyle}>ganadas</Typography>
      </Box>
    </Box>
  );
}

export default PlayedAndWinnedBidsData;
