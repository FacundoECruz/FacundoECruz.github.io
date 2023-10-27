/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../../utils/api-client";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AssociateModal({ open, handleClose, selectedPlayer, setSelectedPlayer, handleSelectedPlayer }) {
  const [options, setOptions] = useState([]);
  const [playerInputValue, setPlayerInputValue] = useState("");

  useEffect(() => {
    fetchOptions();
  }, []);

  async function fetchOptions() {
    try {
      const playersResponse = await api.getUnregisteredPlayers();
      setOptions(playersResponse.data);
    } catch (error) {
      console.error(error);
    }
  }

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
          />
          <Button onClick={() => handleSelectedPlayer()}>Asociar</Button>
        </Box>
      </Modal>
    </div>
  );
}
