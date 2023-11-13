/* eslint-disable no-unused-vars */
import diego from "../../assets/diego.png";
import currentHighest from "../../assets/guiness.png";
import wasGuinness from "../../assets/guiness-modified.png";
import highestRound from "../../assets/highestRound.jpg";
import topTen from "../../assets/topTen.jpg";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../utils/api-client";
import GenericModal from "./modals/GenericModal.jsx";
import TopTenLegacy from "./modals/TopTenModal.jsx";
import CircularProgress from "@mui/material/CircularProgress";

function Achievements() {
  const [allPlayers, setAllPlayers] = useState([]);
  const achievements = JSON.parse(window.localStorage.getItem("achievements"));

  useEffect(() => {
    api.getPlayers().then((res) => {
      setAllPlayers(res.data);
    });
  }, []);

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

  const achievementImageStyle = { width: "150px", maxHeight: "150px", border: "1px solid gold" };

  const containerStyle = {
    maxHeight: "500px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    margin: "15px 20px",
  };

  const achievementStickers = [
    {
      src: currentHighest,
      achievement: achievements.topScoreInAGame,
      title: "Máximo puntaje en una partida",
    },
    {
      src: highestRound,
      achievement: achievements.highestScoreInARound,
      title: "Máximo puntaje en una ronda",
    },
    {
      src: diego,
      achievement: achievements.scoredTenOrMoreInARound,
      title: "Hicieron 10 o más puntos en una ronda",
    },
    { src: topTen, title: "Top Ten" },
    {
      src: wasGuinness,
      achievement: achievements.wasTopScoreInAGame,
      title: "Tuvieron el record de puntaje más alto",
    },
  ];

  return (
    <div style={mainContainerStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          {!allPlayers.length ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress sx={{ color: "white" }} />
            </Box>
          ) : (
            <div style={containerStyle}>
              {achievementStickers.map((achiev, index) => {
                if (achiev.title === "Top Ten") {
                  return (
                    <TopTenLegacy
                      key={index}
                      image={achiev.src}
                      imageStyle={achievementImageStyle}
                      players={allPlayers}
                    />
                  );
                } else {
                  return (
                    <GenericModal
                      key={index}
                      image={achiev.src}
                      imageStyle={achievementImageStyle}
                      achievement={achiev.achievement}
                      title={achiev.title}
                      players={allPlayers}
                    />
                  );
                }
              })}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Achievements;
