/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function UserCard({ userData, handleLogout, close }) {
  const userAverage = (userData.totalScore / userData.gamesPlayed).toFixed(1);

  return (
    <Card sx={{ width: "190px", height: "100%" }}>
      <CardMedia
        sx={{ height: 140, margin: "5px", borderRadius: "5%" }}
        image={
          userData.image === ""
            ? "https://res.cloudinary.com/dfknsvqer/image/upload/v1689874326/empty_user_jyenqo.jpg"
            : userData.image
        }
        title="user pic"
      />
      <CardContent
        sx={{ border: "1px solid black", borderRadius: "5%", margin: "5px" }}
      >
        <Typography variant="body1">{userData.username}</Typography>
        <Typography variant="body2">Jugadas: {userData.gamesPlayed}</Typography>
        <Typography variant="body2">Ganadas: {userData.gamesWon}</Typography>
        <Typography variant="body2">
          Creadas: {userData.createdGames}
        </Typography>
        <Typography variant="body2">
          PPP: {isNaN(userAverage) ? "-" : userAverage}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          my: "12px",
        }}
      >
        <Button
          variant="contained"
          component="a"
          href="#/edit"
          onClick={() => close()}
          sx={{
            bgcolor: "lightgreen",
            color: "black",
            fontSize: "10px",
            "&:hover": {
              bgcolor: "black",
              color: "lightgreen",
            },
          }}
        >
          Editar
        </Button>
        <Button
          variant="contained"
          onClick={() => handleLogout()}
          sx={{
            bgcolor: "purple",
            fontSize: "10px",
            "&:hover": {
              bgcolor: "white",
              color: "purple",
            },
          }}
        >
          Cerrar sesión
        </Button>
        <Button
          variant="contained"
          onClick={() => close()}
          href="#/associates"
          sx={{
            bgcolor: "green",
            fontSize: "10px",
            "&:hover": {
              bgcolor: "green",
              color: "white",
            },
          }}
        >
          Asociados
        </Button>
      </Box>
    </Card>
  );
}

export default UserCard;
