/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Stars from "../../components/Stars";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AchievementsBox from "../../components/achievements/AchievementsBox";

function PlayerModal({ player, onClose, stats }) {
  const defaultImage =
    "https://res.cloudinary.com/dfknsvqer/image/upload/v1689874326/empty_user_jyenqo.jpg";

  const rowStyles = {display: "flex", flexDirection: "row", justifyContent: "flex-start", my: 1};
  function iconStyles(color) {
    return {color: color, mr: 1}
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "10px",
          borderRadius: "8px",
          width: { md: "50%", sm: "95%" },
          maxHeight: "350px",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            boxSizing: "border-box",
            bgcolor: "green",
          }}
        >
          <CardMedia
            component="img"
            alt="user pic"
            image={player.image === "" ? defaultImage : player.image}
            sx={{ width: "40%", maxHeight: "300px" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {player.username}
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              <Stars value={player.gamesWon} />
            </Box>
            <Box sx={rowStyles}>
              <SportsEsportsIcon sx={iconStyles("orange")}/>
              <Typography>Jugadas: {player.gamesPlayed}</Typography>
            </Box>
            <Box sx={rowStyles}>
              <MilitaryTechIcon sx={iconStyles("purple")}/>
              <Typography>
                Promedio:
                {player.totalScore === 0
                  ? "-"
                  : (player.totalScore / player.gamesPlayed).toFixed(1)}
              </Typography>
            </Box>
            <AchievementsBox data={stats}/>
          </CardContent>
        </Card>
        <Button onClick={onClose} sx={{ color: "red" }}>
          Cerrar
        </Button>
      </div>
    </div>
  );
}

export default PlayerModal;
