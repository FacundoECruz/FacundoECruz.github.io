import { Tooltip } from "@mui/material";

/* eslint-disable react/prop-types */
function Sticker({ img, msg, wasTopImage = null, guinessStyle = null }) {
  const imageStyle = {
    width: "25px",
    height: "auto",
    marginLeft: "1px",
    marginRight: "3px",
  };

  return (
    <Tooltip title={msg}>
      <img
        src={img}
        style={
          wasTopImage ? wasTopImage : guinessStyle ? guinessStyle : imageStyle
        }
      />
    </Tooltip>
  );
}

export default Sticker;
