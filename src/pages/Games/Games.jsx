import { Typography } from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";

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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" sx={{ color: "white" }}>
        Proximamente...
      </Typography>
      <EngineeringIcon fontSize="large" sx={{color: "white"}}/>
    </div>
  );
}

export default Games;
