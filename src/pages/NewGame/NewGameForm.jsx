/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import api from "../../utils/api-client";

function NewGameForm({selectedPlayer, setSelectedPlayer, playerInputValue, setPlayerInputValue}) {

  const [options, setOptions] = useState([]);


  function handleChange(event, newValue) {
    setSelectedPlayer(newValue);
  }

  function handleInputChange(event, newInputValue) {
    setPlayerInputValue(newInputValue);
  }

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await api.getPlayers();
        setOptions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOptions();
  }, []);

  

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
          label="Nombre"
          type="text"
          variant="outlined"
          required
          sx={{ mx: 1 }}
        />
      )}
    />
  );
}

export default NewGameForm;
