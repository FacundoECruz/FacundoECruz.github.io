/* eslint-disable react/prop-types */
import { Typography, Button, Box } from "@mui/material";

const PlayerDash = ({ player, index, dispatch, types }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid blue",
        width: { md: "40%" },
        maxHeight: "150px",
        bgcolor: "black",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          mb: 2,
          color: "white",
          fontFamily: "'Bodoni Moda', serif",
          fontSize: "30px",
        }}
      >
        {player.username}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Box sx={{ mb: 2, mt: 2 }}>
          <Typography variant="h6" sx={{ color: "white", fontSize: "16px" }}>
            Apuesta
          </Typography>
          <Button
            id="bid-button"
            variant="contained"
            onClick={() => dispatch({ type: types.addBid, index: index })}
            sx={{
              bgcolor: "green",
              "&:hover": {
                border: "1px solid yellow",
                color: "black",
                bgcolor: "white",
              },
            }}
          >
            {player.bid}
          </Button>
          <Button
            onClick={() => dispatch({ type: types.resetBid, index: index })}
            sx={{
              "&:hover": {
                color: "white",
              },
            }}
          >
            Reset
          </Button>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ color: "white", fontSize: "16px" }}>
            Pierde
          </Typography>
          <Button
            id="lost-button"
            variant="contained"
            onClick={() => dispatch({ type: types.addLost, index: index })}
            sx={{
              bgcolor: "red",
              "&:hover": {
                border: "1px solid yellow",
                color: "black",
                bgcolor: "white",
              },
            }}
          >
            {player.bidsLost}
          </Button>
          <Button
            onClick={() => dispatch({ type: types.resetLost, index: index })}
            sx={{
              "&:hover": {
                color: "white",
              },
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PlayerDash;
