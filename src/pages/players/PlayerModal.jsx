/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Stars from "../../components/Stars";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import mazo from "../../assets/hachazo.jpg";
import AchievementsBox from "../../components/achievements/AchievementsBox";
import { useEffect, useState } from "react";
import api from "../../utils/api-client";
import { CircularProgress } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import SquareIcon from "@mui/icons-material/Square";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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
  });

  useEffect(() => {
    api.getPlayerDataService(player.username).then((res) => {
      setPlayerData(res.data);
    });
  }, [player]);

  const data = [
    {
      data: [
        {
          id: 0,
          value: playerData.winnedRounds,
          color: "green",
        },
        {
          id: 1,
          value: playerData.lostRounds,
          color: "red",
        },
      ],
      highlightScope: { faded: "global", highlighted: "item" },
      faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
    },
  ];

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

  const defaultImage =
    "https://res.cloudinary.com/dfknsvqer/image/upload/v1689874326/empty_user_jyenqo.jpg";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          background: "black",
          padding: "7px",
          borderRadius: "8px",
          width: "90%",
          maxHeight: "100%",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            border: "1px solid white",
          }}
        >
          <IconButton color="inherit">
            <Avatar
              src={player.image === "" ? defaultImage : player.image}
              alt="User Avatar"
            />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography gutterBottom variant="h6" sx={{ color: "white" }}>
              {player.username}
            </Typography>
            <Box>
              <Stars value={player.gamesWon} starWidth={"18px"} />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              border: "1px solid white",
              padding: "7px",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "white",
                  padding: "8px",
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                {player.gamesPlayed}
              </Typography>
              <Typography sx={{ color: "white", fontSize: "14px" }}>
                Partidas
              </Typography>
              <Typography sx={{ color: "white", fontSize: "14px" }}>
                jugadas
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "white",
                  padding: "8px",
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                {playerData.totalExtraScore}
              </Typography>
              <Typography sx={{ color: "white", fontSize: "14px" }}>
                Apuestas
              </Typography>
              <Typography sx={{ color: "white", fontSize: "14px" }}>
                ganadas
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: "5px",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <AchievementsBox data={stats} />
            {playerData.flawlessVictory ? (
              <Badge badgeContent={playerData.flawlessVictory} color="success">
                <Chip
                  label="Partida perfecta"
                  color="success"
                  variant="outlined"
                  sx={{ border: "1px solid gold" }}
                />
              </Badge>
            ) : null}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              margin: "10px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid white",
                padding: "5px",
                width: `${earlyPercentage}%`,
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "white" }}>
                {`${earlyPercentage}%`}
              </Typography>
              <Typography sx={{ color: "white" }}>Early</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid white",
                padding: "5px",
                width: `${midPercentage}%`,
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "white" }}>
                {`${midPercentage}%`}
              </Typography>
              <Typography sx={{ color: "white" }}>Mid</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid white",
                padding: "5px",
                width: `${latePercentage}%`,
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "white" }}>
                {`${latePercentage}%`}
              </Typography>
              <Typography sx={{ color: "white" }}>Late</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", margin: "10px" }}>
            <Typography variant="h5" sx={{ color: "white" }}>
              Rondas
            </Typography>
            <PieChart series={data} width={230} height={150} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "35%" }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
              <SquareIcon sx={{ color: "green" }} />
              <Typography sx={{ color: "white" }}>Ganadas</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
              <SquareIcon sx={{ color: "red" }} />
              <Typography sx={{ color: "white" }}>Perdidas</Typography>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography>Mejor racha</Typography>
            </Box>
            <Box>
              <Typography>Peor racha</Typography>
            </Box>
          </Box>
        </Box>

        <Button onClick={onClose} sx={{ color: "red" }}>
          Cerrar
        </Button>
      </Box>
    </div>
  );
}

export default PlayerModal;
