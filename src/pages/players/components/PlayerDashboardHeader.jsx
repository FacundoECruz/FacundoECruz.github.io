/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import Stars from "../../../components/Stars";

function PlayerDashboardHeader({player}) {

  const headerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    border: "1px solid white",
    marginTop: "12px",
  }

  const defaultImage =
  "https://res.cloudinary.com/dfknsvqer/image/upload/v1689874326/empty_user_jyenqo.jpg";

  return (
    <Box sx={headerStyle}>
      <IconButton color="inherit">
        <Avatar
          src={player.image === "" ? defaultImage : player.image}
          alt="User Avatar"
        />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography gutterBottom variant="h6" sx={{ color: "white" }}>
          {player.username}
        </Typography>
        <Box>
          <Stars value={player.gamesWon} starWidth={"18px"} />
        </Box>
      </Box>
    </Box>
  );
}

export default PlayerDashboardHeader;
