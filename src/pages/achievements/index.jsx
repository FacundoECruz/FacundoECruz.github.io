/* eslint-disable no-unused-vars */
import diego from "../../assets/diego.png";
import currentHighest from "../../assets/guiness.png";
import wasGuinness from "../../assets/guiness-modified.png";
import highestRound from "../../assets/highestRound.jpg";
import topTen from "../../assets/topTen.jpg";
import { Box, Grid, Typography } from "@mui/material";
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

  function handleHighestScoreInAGame() {
    const { topScoreInAGame } = achievements;
    // topScoreInAGame.push({username:"Antone", score: 55})
    const instance = "partida";
    if (topScoreInAGame.length === 1) {
      const player = setPlayerData(topScoreInAGame);
      singleTopScoreModal(player, instance);
    } else {
      const players = setPlayersData(topScoreInAGame);
      moreThanOneTopScoreModal(players, instance);
    }
  }

  function handleHighestScoreInARound() {
    const { highestScoreInARound } = achievements;
    // highestScoreInARound.push({ username: "Chaky", score: 11 });
    const instance = "ronda";
    if (highestScoreInARound.length === 1) {
      //Se podrian meter estas dos cosas en una sola funcion
      const player = setPlayerData(highestScoreInARound);
      singleTopScoreModal(player, instance);
    } else {
      const players = setPlayersData(highestScoreInARound);
      moreThanOneTopScoreModal(players, instance);
    }
  }

  function setPlayerData(topScoreInAGame) {
    const [player] = allPlayers.filter(
      (p) => p.username === topScoreInAGame[0].username
    );
    player.score = topScoreInAGame[0].score;
    return player;
  }

  function setPlayersData(topScoreInAGame) {
    let players = [];
    for (let i = 0; i < topScoreInAGame.length; i++) {
      getPlayerDataAndPutIntoList(topScoreInAGame, players, i);
    }
    return players;
  }

  function getPlayerDataAndPutIntoList(topScoreInAGame, players, i) {
    const [player] = allPlayers.filter(
      (p) => p.username === topScoreInAGame[i].username
    );
    player.score = topScoreInAGame[i].score;
    players.push(player);
  }

  function handleTenOrMoreInARound() {
    const { scoredTenOrMoreInARound } = achievements;
    const playersWithTenOrMore = populateTenOrMoreList(scoredTenOrMoreInARound);
    const title = "Anotaron 10 o más puntos en una ronda";
    multiplePlayersModal(playersWithTenOrMore, title);
  }

  function populateTenOrMoreList(scoredTenOrMoreInARound) {
    const playersWithTenOrMore = [];
    for (let i = 0; i < scoredTenOrMoreInARound.length; i++) {
      getDataAndAddToList(scoredTenOrMoreInARound, playersWithTenOrMore, i);
    }
    return playersWithTenOrMore;
  }

  function getDataAndAddToList(
    scoredTenOrMoreInARound,
    playersWithTenOrMore,
    i
  ) {
    const [playerWithTenOrMore] = allPlayers.filter(
      (p) => p.username === scoredTenOrMoreInARound[i]
    );
    playersWithTenOrMore.push(playerWithTenOrMore);
  }

  function handleWasGuinness() {
    const { wasTopScoreInAGame } = achievements;
    const playersData = setPlayersData(wasTopScoreInAGame);
    const players = extractPlayersDataForModal(playersData);
    const title = "Tuvieron el record de puntaje más alto";
    multiplePlayersModal(players, title);
  }

  function extractPlayersDataForModal(playersData) {
    let players = [];
    for (let i = 0; i < playersData.length; i++) {
      let player = getRelevantData(playersData, i);
      players.push(player);
    }
    return players;
  }

  function getRelevantData(playersData, i) {
    let player = {};
    player.username = playersData[i].username;
    player.score = playersData[i].score;
    player.image = playersData[i].image;
    return player;
  }

  const mainContainerStyle = {
    position: "relative",
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dfknsvqer/image/upload/v1699364327/altisima/mio-ito-U8OYfPBceWE-unsplash_h36hu0.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const achievementImageStyle = { width: "150px", border: "1px solid gold" };

  const containerStyle = {
    maxHeight: "500px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    margin: "15px 20px",
  };

  const topTenContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  };

  const topTenHeaderStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "35px",
    marginBottom: "20px",
  };

  const topTenModalTitles = ["Jugador", "Ganadas", "Puntaje Total"];

  const achievementStickers = [
    { src: currentHighest, onClick: handleHighestScoreInAGame },
    { src: highestRound, onClick: handleHighestScoreInARound },
    { src: diego, onClick: handleTenOrMoreInARound },
    { src: topTen, onClick: handleOpen },
    { src: wasGuinness, onClick: handleWasGuinness },
  ];

  return (
    <div style={mainContainerStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <div style={containerStyle}>
            {achievementStickers.map((achiev, index) => (
              <img
                key={index}
                src={achiev.src}
                style={achievementImageStyle}
                onClick={achiev.onClick}
              />
            ))}
          </div>
        </Grid>
      </Grid>

      <Modal
        open={openTopTenModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={topTenContainerStyle}>
          <Box sx={topTenHeaderStyle}>
            {topTenModalTitles.map((text, index) => (
              <Typography key={index} color={"white"}>
                {text}
              </Typography>
            ))}
          </Box>
          {topTenList.map((player, i) => {
            return <TopTenPlayer data={player} key={i} />;
          })}
        </Box>
      </Modal>
    </div>
  );
}

export default Achievements;
