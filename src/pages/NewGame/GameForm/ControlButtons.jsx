/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";

function ControlButtons({addPlayer, setPlayers}) {
  return (
    <Box sx={{ my: 2, mx: 1 }}>
      <Button onClick={addPlayer} variant="contained" sx={{ bgcolor: "green" }}>
        Agregar
      </Button>
      <Button onClick={() => setPlayers([])} variant="contained">
        Limpiar
      </Button>
    </Box>
  );
}

export default ControlButtons;
