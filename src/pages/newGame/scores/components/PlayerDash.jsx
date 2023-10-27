/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Typography, Button, Box } from "@mui/material";
import AchievementsBox from "../../../../components/achievements/AchievementsBox";

const PlayerDash = ({ player, index, dispatch, types, achievements }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid blue",
        maxHeight: "120px",
        bgcolor: "black",
      }}
    >
      <Box sx={{display: "flex", flexDirection: "row"}}>
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            ml: 1,
            color: "white",
            fontFamily: "'Bodoni Moda', serif",
            fontSize: player.username.length > 9 ? "20px" : "25px",
          }}
        >
          {player.username}
        </Typography>
        <AchievementsBox data={achievements} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          maxHeight: "80px",
        }}
      >
        <Box sx={{ mb: 2, mt: 2 }}>
          <Typography variant="h6" sx={{ color: "white", fontSize: "16px" }}>
            Apuesta
          </Typography>
          <Button
            id="bid-button"
            data-testid="bid-button"
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
            data-testid="reset-bid"
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
            data-testid="lost-button"
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
            data-testid="reset-lost"
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
