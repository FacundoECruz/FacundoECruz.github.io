import { Typography } from "@mui/material";

function Games() {
  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dfknsvqer/image/upload/v1686776553/zuza-galczynska-c5_eQi4rrjA-unsplash_gaz4ty.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h5" sx={{color: "white"}}>Partidas Jugadas</Typography>
    </div>
  );
}

export default Games;
