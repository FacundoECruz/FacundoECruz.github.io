import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import api from "../../../utils/api-client";

// eslint-disable-next-line react/prop-types
function AddPlayerToDb({putNewPlayerIntoGameList, fetchOptions}) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null)

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const savePlayer = async () => {
    api
      .createPlayer({username: inputValue})
      .then(res => {
        putNewPlayerIntoGameList(res.data.username)
        fetchOptions()
        setOpen(false)
      })
      .catch(err => {
        setError(err.response.data)
      })
  }

  return (
    <Card sx={{bgcolor: "black", borderRadius: "5%", mx: "5px", width: "90%", maxHeight: "200px"}}>
      <CardContent>
        <Typography sx={{ fontSize: 14, color: "white" }} color="text.secondary" gutterBottom>
          Agregar jugador
        </Typography>
        <Typography variant="h6" sx={{color: "white"}}>A la base de datos</Typography>
        <Typography variant="p" sx={{color: "white"}}>
          Los jugadores deben estar en la base de datos para participar en las
          partidas
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={handleClickOpen}>
          Agregar
        </Button>
      </CardActions>

      {/* Dialog */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nickname del jugador</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Se guardará registro de las partidas de este jugador y posteriormente la informacion
            podrá ser asociada a una cuenta.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="ej: Klan"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </DialogContent>
        {error ? <Typography sx={{color: "red"}}>{error}</Typography> : null }
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={savePlayer}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default AddPlayerToDb;
