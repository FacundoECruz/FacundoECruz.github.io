import { Box, Typography } from "@mui/material";
import Stars from "../../../../components/Stars.jsx";

/* eslint-disable react/prop-types */
function TopTenPlayer({ data }) {
  const rowStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <Box sx={rowStyle}>
      <Box sx={{ display: "flex", flexDirection: "row", width: "150px" }}>
        <img
          src={data.image}
          style={{
            width: "45px",
            height: "45px",
            margin: "5px",
            borderRadius: "50%",
          }}
        />
        <Typography variant="h6" color={"white"}>
          {data.username}
        </Typography>
      </Box>
      <Box sx={{ width: "150px" }}>
        <Stars value={data.gamesWon} />
      </Box>
      <Typography color={"white"}>{data.totalScore}</Typography>
    </Box>
  );
}

export default TopTenPlayer;
