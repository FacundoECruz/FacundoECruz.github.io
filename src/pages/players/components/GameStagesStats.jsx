/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

function GameStagesStats({ percentages }) {
  const earlyPercentage = percentages ? percentages.earlyPercentage : 0;
  const midPercentage = percentages ? percentages.midPercentage : 0;
  const latePercentage = percentages ? percentages.latePercentage : 0;

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    margin: "10px",
    width: "100%",
  };

  const earlyStyle = {
    display: "flex",
    flexDirection: "column",
    border: "1px solid white",
    padding: "5px",
    width: earlyPercentage ? `${earlyPercentage}%` : "33%",
    alignItems: "center",
  };

  const midStyle = {
    display: "flex",
    flexDirection: "column",
    border: "1px solid white",
    padding: "5px",
    width: midPercentage ? `${midPercentage}%` : "33%",
    alignItems: "center",
  };

  const lateStyle = {
    display: "flex",
    flexDirection: "column",
    border: "1px solid white",
    padding: "5px",
    width: latePercentage ? `${latePercentage}%` : "33%",
    alignItems: "center",
  };

  return (
    <Box sx={containerStyle}>
      <Box sx={earlyStyle}>
        <Typography sx={{ color: "white" }}>{`${earlyPercentage}%`}</Typography>
        <Typography sx={{ color: "white" }}>Early</Typography>
      </Box>
      <Box sx={midStyle}>
        <Typography sx={{ color: "white" }}>{`${midPercentage}%`}</Typography>
        <Typography sx={{ color: "white" }}>Mid</Typography>
      </Box>
      <Box sx={lateStyle}>
        <Typography sx={{ color: "white" }}>{`${latePercentage}%`}</Typography>
        <Typography sx={{ color: "white" }}>Late</Typography>
      </Box>
    </Box>
  );
}

export default GameStagesStats;
