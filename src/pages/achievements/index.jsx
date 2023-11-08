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
import { singleTopScoreModal } from "./modals/highestScore/singleHighestModal";
import { moreThanOneTopScoreModal } from "./modals/highestScore/moreThanOneHighestModal";
import { wasHighestScoreModal } from "./modals/wasTopScore/wasTopScoreModal";

function Achievements() {
  const [topTenList, setTopTenList] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
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
    const instance = "partida"
    console.log(achievements)
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
    const instance = "ronda"

    if (highestScoreInARound.length === 1) {
      const player = findPlayerData(highestScoreInARound);
      singleTopScoreModal(player, instance);
    } else {
      const players = findPlayersData(highestScoreInARound);
      moreThanOneTopScoreModal(players, instance);
    }
  }

  function handleTenOrMoreInARound() {}

  function handleTopTen() {}

  function handleWasGuinness() {
    const { wasTopScoreInAGame } = achievements;
    const playersData = findPlayersData(wasTopScoreInAGame);
    const players = extractPlayersData(playersData);
    wasHighestScoreModal(players)
  }

  function extractPlayersData(playersData) {
    let players = [];
    for(let i = 0; i < playersData.length; i++) {
      let player = {};
      player.username = playersData[i].username;
      player.score = playersData[i].score;
      player.image = playersData[i].image;
      players.push(player)
    }
    return players;
  }

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
        <img src={topTen} style={imageStyle} onClick={handleTopTen} />
        <img src={wasGuinness} style={imageStyle} onClick={handleWasGuinness} />
      </div>
    </div>
  );
}

export default Achievements;
