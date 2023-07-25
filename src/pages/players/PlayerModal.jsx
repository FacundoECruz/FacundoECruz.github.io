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

function PlayerModal({ player, onClose }) {
  
  const defaultImage = "https://res.cloudinary.com/dfknsvqer/image/upload/v1689874326/empty_user_jyenqo.jpg"

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
            <Typography>Partidas Jugadas: {player.gamesPlayed}</Typography>
            <Typography>Partidas Ganadas: {player.gamesWon}</Typography>
            <Typography>
              Promedio por partida:
              {player.totalScore === 0 ? "-" : (player.totalScore / player.gamesPlayed).toFixed(1)}
            </Typography>
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
