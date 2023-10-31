import { Box, Popover, Typography } from "@mui/material";
import { useState } from "react";

/* eslint-disable react/prop-types */
function Sticker({ img, msg, wasTopImage = null, guinessStyle = null }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const imageStyle = {
    width: "25px",
    height: "auto",
    marginLeft: "1px",
    marginRight: "3px",
  };

  return (
    <Box sx={{display: "flex"}}>
      <img
        src={img}
        aria-describedby={id}
        onClick={handleClick}
        style={
          wasTopImage ? wasTopImage : guinessStyle ? guinessStyle : imageStyle
        }
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>{msg}</Typography>
      </Popover>
    </Box>
  );
}

export default Sticker;
