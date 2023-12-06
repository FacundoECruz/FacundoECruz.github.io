/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Typography, Button, Box } from "@mui/material";
import AchievementsBox from "../../../../components/achievements/AchievementsBox";
import { useState } from "react";
import { useEffect } from "react";
import hasAtLeastOneAchievement from "../utils/hasAtLeastOneAchievement.js";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";

const PlayerDash = ({ player, index, dispatch, types, achievements }) => {
  const [hasAchievement, setHasAchievement] = useState(false);

  useEffect(() => {
    setHasAchievement(hasAtLeastOneAchievement(achievements));
  }, [achievements, hasAchievement]);

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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h2"
          sx={{
            mb: "3px",
            ml: 1,
            color: "white",
            fontFamily: "'Bodoni Moda', serif",
            fontSize: player.username.length > 5 ? "20px" : "23px",
          }}
        >
          {player.username}
        </Typography>
        {hasAchievement ? (
          <Box sx={{ ml: 1 }}>
            <AchievementsBox data={achievements} />
          </Box>
        ) : null}
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
          <Typography variant="h6" sx={{ color: "white", fontSize: "14px" }}>
            Ganó
          </Typography>
          <Button
            id="bid-button"
            data-testid="bid-button"
            variant="contained"
            onClick={() => dispatch({ type: types.addBid, index: index })}
            sx={{
              bgcolor: "green",
              "&:focus": {
                border: "1px solid #FFD700",
                backgroundColor: "green",
              },
            }}
          >
            {player.bid}
          </Button>
          <Button
            data-testid="reset-bid"
            onClick={() => dispatch({ type: types.resetBid, index: index })}
            sx={{
              "&:focus": {
                color: "white",
              },
              fontSize: "10px",
              minWidth: "32px",
              padding: "3px 3px",
            }}
          >
            {player.bid !== 0 ? (
              <SettingsBackupRestoreIcon />
            ) : (
              <SettingsBackupRestoreIcon sx={{ color: "black" }} />
            )}
          </Button>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ color: "white", fontSize: "14px" }}>
            Perdió
          </Typography>
          <Button
            id="lost-button"
            data-testid="lost-button"
            variant="contained"
            onClick={() => dispatch({ type: types.addLost, index: index })}
            sx={{
              bgcolor: "red",
              "&:focus": {
                border: "1px solid #FFD700",
                backgroundColor: "red",
              },
            }}
          >
            {player.bidsLost}
          </Button>
          <Button
            data-testid="reset-lost"
            onClick={() => dispatch({ type: types.resetLost, index: index })}
            sx={{
              "&:focus": {
                color: "white",
              },
              fontSize: "10px",
              minWidth: "32px",
              padding: "3px 3px",
            }}
          >
            {player.bidsLost !== 0 ? (
              <SettingsBackupRestoreIcon />
            ) : (
              <SettingsBackupRestoreIcon sx={{ color: "black" }} />
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PlayerDash;
