import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingServer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        border: "1px solid black",
        width: "70%",
        height: "400px",
        borderRadius: "5%",
      }}
    >
      <Typography>Cargando data del servidor</Typography>
      <CircularProgress />
    </Box>
  );
}

export default LoadingServer;
