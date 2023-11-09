/* eslint-disable no-unused-vars */
import diego from "../../assets/diego.png";
import currentGuiness from "../../assets/guiness.png";
import wasGuinness from "../../assets/guiness-modified.png";
import highestRound from "../../assets/highestRound.jpg";
import topTen from "../../assets/topTen.jpg";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Swal from "sweetalert2";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../utils/api-client";
import { singleTopScoreModal } from "./modals/highestScore/singleHighestModal.js";
import { moreThanOneTopScoreModal } from "./modals/highestScore/moreThanOneHighestModal.js";
import { multiplePlayersModal } from "./modals/multiplePlayersModal/multiplePlayersModal.js";
import { Modal } from "@mui/material";
import TopTenPlayer from "./modals/topTen/TopTenModalPlayer.jsx";

function Achievements() {
  const [topTenList, setTopTenList] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [openTopTenModal, setOpenTopTenModal] = useState(false);
  const handleOpen = () => setOpenTopTenModal(true);
  const handleClose = () => setOpenTopTenModal(false);

  const achievements = JSON.parse(window.localStorage.getItem("achievements"));

  useEffect(() => {
    api.getPlayers().then((res) => {
      console.log(res.data)
      setAllPlayers(res.data);
      const sortedArray = res.data.sort((a, b) => {
        if (b.gamesWon !== a.gamesWon) {
          return b.gamesWon - a.gamesWon;
        } else {
          return b.totalScore - a.totalScore;
        }
      });
      const top = sortedArray.slice(0, 10);
      setTopTenList(top);
    });
  }, []);

  const imageStyle = { width: "150px", border: "1px solid gold" };
  const containerStyle = {
    maxHeight: "500px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    margin: "15px 20px",
  };

  function handleHighestScoreInAGame() {
    const { topScoreInAGame } = achievements;
    const instance = "partida";
    if (topScoreInAGame.length === 1) {
      const player = findPlayerData(topScoreInAGame);
      singleTopScoreModal(player, instance);
    } else {
      const players = findPlayersData(topScoreInAGame);
      moreThanOneTopScoreModal(players, instance);
    }
  }

  function findPlayerData(topScoreInAGame) {
    const [player] = allPlayers.filter(
      (p) => p.username === topScoreInAGame[0].username
    );
    player.score = topScoreInAGame[0].score;
    return player;
  }

  function findPlayersData(topScoreInAGame) {
    let players = [];
    for (let i = 0; i < topScoreInAGame.length; i++) {
      const [player] = allPlayers.filter(
        (p) => p.username === topScoreInAGame[i].username
      );
      player.score = topScoreInAGame[i].score;
      players.push(player);
    }
    return players;
  }

  function handleHighestScoreInARound() {
    const { highestScoreInARound } = achievements;
    const instance = "ronda";

    if (highestScoreInARound.length === 1) {
      const player = findPlayerData(highestScoreInARound);
      singleTopScoreModal(player, instance);
    } else {
      const players = findPlayersData(highestScoreInARound);
      moreThanOneTopScoreModal(players, instance);
    }
  }

  function handleTenOrMoreInARound() {
    const { scoredTenOrMoreInARound } = achievements;
    const playersWithTenOrMore = [];
    for (let i = 0; i < scoredTenOrMoreInARound.length; i++) {
      const [playerWithTenOrMore] = allPlayers.filter(
        (p) => p.username === scoredTenOrMoreInARound[i]
      );
      playersWithTenOrMore.push(playerWithTenOrMore);
    }
    const title = "Anotaron 10 o más puntos en una ronda";
    multiplePlayersModal(playersWithTenOrMore, title);
  }

  function handleWasGuinness() {
    const { wasTopScoreInAGame } = achievements;
    const playersData = findPlayersData(wasTopScoreInAGame);
    const players = extractPlayersData(playersData);
    const title = "Tuvieron el record de puntaje más alto";
    multiplePlayersModal(players, title);
  }

  function extractPlayersData(playersData) {
    let players = [];
    for (let i = 0; i < playersData.length; i++) {
      let player = {};
      player.username = playersData[i].username;
      player.score = playersData[i].score;
      player.image = playersData[i].image;
      players.push(player);
    }
    return players;
  }

  const topTenStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dfknsvqer/image/upload/v1699364327/altisima/mio-ito-U8OYfPBceWE-unsplash_h36hu0.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={containerStyle}>
        <img
          src={currentGuiness}
          style={imageStyle}
          onClick={handleHighestScoreInAGame}
        />
        <img
          src={highestRound}
          style={imageStyle}
          onClick={handleHighestScoreInARound}
        />
        <img src={diego} style={imageStyle} onClick={handleTenOrMoreInARound} />
        <img src={topTen} style={imageStyle} onClick={handleOpen} />
        <img src={wasGuinness} style={imageStyle} onClick={handleWasGuinness} />
      </div>

      <Modal
        open={openTopTenModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={topTenStyle}>
          <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginLeft: "35px", marginBottom: "20px"}}>
            <Typography color={"white"}>Jugador</Typography>
            <Typography color={"white"}>Ganadas</Typography>
            <Typography color={"white"}>Puntaje Total</Typography>
          </Box>
          {topTenList.map((player, i) => {
            return <TopTenPlayer data={player} key={i}/>;
          })}
        </Box>
      </Modal>
    </div>
  );
}

export default Achievements;
