/* eslint-disable react/prop-types */
import { TextField, Autocomplete } from "@mui/material";

function NewGameForm({selectedPlayer, setSelectedPlayer, playerInputValue, setPlayerInputValue, options}) {

  function handleChange(event, newValue) {
    setSelectedPlayer(newValue);
  }

  function handleInputChange(event, newInputValue) {
    setPlayerInputValue(newInputValue);
  }

  const filterOptions = (options, state) => {
    if (state.inputValue === '' || options.length === 0) {
      return [];
    }

    return options.filter(option =>
      option.username.toLowerCase().includes(state.inputValue.toLowerCase())
    );
  }
  return (
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
          // label="Nombre"
          type="text"
          variant="outlined"
          required
          sx={{ mx: 1, bgcolor: "white" }}
        />
      )}
    />
  );
}

export default NewGameForm;
