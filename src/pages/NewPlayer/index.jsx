import OptionBox from "./OptionBox.jsx";
import { Typography, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import LightModeIcon from "@mui/icons-material/LightMode";

function NewPlayer() {
  return (
    <>
      <Typography textAlign="center" variant="h2" mb={5}>
        Crear Jugador
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <OptionBox
            message="Crear nueva cuenta"
            buttonVariant="contained"
            buttonText="New"
            icon={<AddIcon />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <OptionBox
            message="Asociar cuenta con jugador existente"
            buttonVariant="outlained"
            buttonText="Asociate"
            icon={<ConnectWithoutContactIcon />}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <OptionBox
            message="Ver al brillan"
            buttonVariant="contained"
            buttonText="Brillan"
            icon={<LightModeIcon />}
            color="warning"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default NewPlayer;
