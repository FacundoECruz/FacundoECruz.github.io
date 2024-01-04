/* eslint-disable react/prop-types */
import { Badge, Box, Chip } from "@mui/material";
import AchievementsBox from "../../../components/achievements/AchievementsBox";

function StickersAndPerfectGame({playerData, stats}) {
  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    marginTop: "5px",
    justifyContent: "space-around",
    width: "100%",
  };

  return (
    <Box sx={containerStyle}>
      <AchievementsBox data={stats} />
      {playerData.flawlessVictory ? (
        <Badge badgeContent={playerData.flawlessVictory} color="success">
          <Chip
            label="Partida perfecta"
            color="success"
            variant="outlined"
            sx={{ border: "1px solid gold" }}
          />
        </Badge>
      ) : null}
    </Box>
  );
}

export default StickersAndPerfectGame;
