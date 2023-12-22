/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import SquareIcon from "@mui/icons-material/Square";

function RoundsChart({ playerData }) {
  const pieChartData = [
    {
      data: [
        {
          id: 0,
          value: playerData.winnedRounds,
          color: "green",
        },
        {
          id: 1,
          value: playerData.lostRounds,
          color: "red",
        },
      ],
      highlightScope: { faded: "global", highlighted: "item" },
      faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
    },
  ];

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const chartContainerStyle = {
    display: "flex",
    flexDirection: "row",
    margin: "10px",
  };

  const seriesContainerStyle = {
    display: "flex",
    flexDirection: "column",
    width: "35%",
  };

  const seriesRowStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  };

  return (
    <Box sx={containerStyle}>
      <Box sx={chartContainerStyle}>
        <Typography variant="h5" sx={{ color: "white" }}>
          Rondas
        </Typography>
        <PieChart series={pieChartData} width={230} height={150} />
      </Box>
      <Box sx={seriesContainerStyle}>
        <Box sx={seriesRowStyle}>
          <SquareIcon sx={{ color: "green" }} />
          <Typography sx={{ color: "white" }}>Ganadas</Typography>
        </Box>
        <Box sx={seriesRowStyle}>
          <SquareIcon sx={{ color: "red" }} />
          <Typography sx={{ color: "white" }}>Perdidas</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default RoundsChart;
