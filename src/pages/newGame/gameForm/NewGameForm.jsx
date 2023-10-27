/* eslint-disable react/prop-types */
import { TextField, Autocomplete, Paper, Button } from "@mui/material";
import DialogAddPlayerToDb from "./DialogAddPlayerToDb";
import { useState } from "react";

function NewGameForm({
  selectedPlayer,
  setSelectedPlayer,
  playerInputValue,
  setPlayerInputValue,
  options,
  addPlayerToDbAndGame,
  fetchOptions,
}) {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(event, newValue) {
    setSelectedPlayer(newValue);
  }

  function handleInputChange(event, newInputValue) {
    setPlayerInputValue(newInputValue);
  }

  const filterOptions = (options, state) => {
    if (state.inputValue === "" || options.length === 0) {
      return [];
    }

    return options.filter((option) =>
      option.username.toLowerCase().includes(state.inputValue.toLowerCase())
    );
  };
  return (
    <div>
      <Autocomplete
        options={options}
        value={selectedPlayer}
        onChange={handleChange}
        inputValue={playerInputValue}
        onInputChange={handleInputChange}
        getOptionLabel={(option) => (option ? option.username : "")}
        filterOptions={filterOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            id="name"
            type="text"
            variant="outlined"
            required
            sx={{ mx: 1, bgcolor: "white" }}
          />
        )}
        PaperComponent={({ children }) => {
          return (
            <Paper>
              {children}
              <Button
                color="primary"
                fullWidth
                sx={{ justifyContent: "flex-start", pl: 2 }}
                onMouseDown={() => {
                  handleClickOpen();
                }}
              >
                + Agregar Nuevo
              </Button>
            </Paper>
          );
        }}
      />
      <DialogAddPlayerToDb open={open} putNewPlayerIntoGameList={addPlayerToDbAndGame} setOpen={setOpen} fetchOptions={fetchOptions} handleClose={handleClose}/>
    </div>
  );
}

export default NewGameForm;
