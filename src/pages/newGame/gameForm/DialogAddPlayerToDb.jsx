/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import api from "../../../utils/api-client";

function DialogAddPlayerToDb({open, putNewPlayerIntoGameList, setOpen, fetchOptions, handleClose}) {

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  const savePlayer = async () => {
    const user = window.localStorage.getItem("user");
    
    api
      .createPlayer({ username: inputValue, createdBy: user, createdDate: new Date().getTime() })
      .then((res) => {
        console.log(res.data)  
        putNewPlayerIntoGameList(res.data.username);
        fetchOptions();
        setOpen(false);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nickname del jugador</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Se guardará registro de las partidas de este jugador y posteriormente
          la informacion podrá ser asociada a una cuenta.
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
      {error ? <Typography sx={{ color: "red" }}>{error}</Typography> : null}
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={savePlayer}>Agregar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogAddPlayerToDb;
