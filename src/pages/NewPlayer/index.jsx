import OptionBox from "./OptionBox.jsx";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import LightModeIcon from '@mui/icons-material/LightMode';

function NewPlayer() {
  return (
    <>
      <Typography textAlign="center" variant="h2">
        Crear Jugador
      </Typography>
      <OptionBox
        message="Crear nueva cuenta"
        buttonVariant="contained"
        buttonText="New"
        icon={<AddIcon />}
        color="primary"
      />
      <OptionBox
        message="Asociar cuenta con jugador existente"
        buttonVariant="outlained"
        buttonText="Asociate"
        icon={<ConnectWithoutContactIcon />}
      />
      <OptionBox
        message="Ver al brillan"
        buttonVariant="contained"
        buttonText="Brillan"
        icon={<LightModeIcon />}
        color="warning"
      />
    </>
  );
}

export default NewPlayer;
