import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingServer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        width: "70%",
        height: "400px",
        borderRadius: "5%",
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(5px)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" sx={{ color: "white", fontWeight: "400" }}>
        Cargando data del servidor...
      </Typography>
      <CircularProgress />
    </Box>
  );
}

export default LoadingServer;
