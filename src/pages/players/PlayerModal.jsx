/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../utils/api-client";
import PlayerDashboardHeader from "./components/PlayerDashboardHeader";
import PlayedAndWinnedBidsData from "./components/PlayedAndWinnedBidsData";
import StickersAndPerfectGame from "./components/StickersAndPerfectGame";
import GameStagesStats from "./components/GameStagesStats";
import RoundsChart from "./components/RoundsChart";
import Streaks from "./components/Streaks";

function PlayerModal({ player, onClose, stats }) {
  const [playerData, setPlayerData] = useState({
    winnedRounds: 0,
    lostRounds: 0,
    earlyGameScore: 0,
    midGameScore: 0,
    lateGameScore: 0,
    playedGames: 0,
    totalExtraScore: 0,
    flawlessVictory: 0,
    totalScore: 0,
    bestStreak: 0,
    worstStreak: 0,
  });

  useEffect(() => {
    api.getPlayerDataService(player.username).then((res) => {
      setPlayerData(res.data);
    });
  }, [player]);

  const earlyPercentage = (
    (playerData.earlyGameScore / playerData.totalScore) *
    100
  ).toFixed(1);
  const midPercentage = (
    (playerData.midGameScore / playerData.totalScore) *
    100
  ).toFixed(1);
  const latePercentage = (
    (playerData.lateGameScore / playerData.totalScore) *
    100
  ).toFixed(1);

  const percentages = { earlyPercentage, midPercentage, latePercentage };

  const mainContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const modalContainerStyle = {
    background: "black",
    padding: "12px",
    borderRadius: "8px",
    width: "95%",
    maxHeight: "100%",
    overflow: "auto",
  };

  const playerDetailsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  };

  const btnStyle = {
    color: "lightblue",
    border: "1px solid lightblue",
    marginTop: "10px",
  };

  return (
    <div style={mainContainerStyle}>
      <Box style={modalContainerStyle}>
        <PlayerDashboardHeader player={player} />
        <Box sx={playerDetailsContainerStyle}>
          <PlayedAndWinnedBidsData player={player} playerData={playerData} />
          <StickersAndPerfectGame playerData={playerData} stats={stats} />
          <GameStagesStats percentages={percentages} />
          <RoundsChart playerData={playerData} />
          <Streaks playerData={playerData} />
          <Button onClick={onClose} sx={btnStyle}>
            Volver
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default PlayerModal;
