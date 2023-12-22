/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import WinCircle from "./WinCirclel";
import LostCircle from "./LostCircle";

function Streaks({ playerData }) {
  const containerStyle = { margin: "10px", alignSelf: "flex-start" };
  const streakContainerStyle = { display: "flex", flexDirection: "row" };
  const numberStyle = { color: "white", marginLeft: "7px" };

  return (
    <Box sx={containerStyle}>
      <Box>
        <Typography sx={{ color: "white" }}>Mejor racha</Typography>
        <Box sx={streakContainerStyle}>
          <WinCircle value={playerData.bestStreak} />
          <Typography
            sx={numberStyle}
          >{`(${playerData.bestStreak})`}</Typography>
        </Box>
      </Box>
      <Box>
        <Typography sx={{ color: "white" }}>Peor racha</Typography>
        <Box sx={streakContainerStyle}>
          <LostCircle value={playerData.worstStreak} />
          <Typography
            sx={numberStyle}
          >{`(${playerData.worstStreak})`}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Streaks;
