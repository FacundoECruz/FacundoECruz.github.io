/* eslint-disable react/prop-types */
import diego from "../../assets/diego.png";
import currentGuiness from "../../assets/guiness.png";
import wasGuiness from "../../assets/guiness-modified.png";
import highestRound from "../../assets/highestRound.jpg";
import podio from "../../assets/podio.png";
import { Box } from "@mui/material";
import Sticker from "./components/Sticker";

function AchievementsBox({ data }) {
  const {
    isTopScoreInAGame,
    wasTopScoreInAGame,
    isTop3,
    isHighestScoreInARound,
    scoredTenOrMoreInARound,
  } = data;

  const tenOrMoreArray = Array.from({ length: scoredTenOrMoreInARound });
  const wasTopScoreArray = Array.from({ length: wasTopScoreInAGame });

  const wasTopImageStyle = {
    width: "25px",
    height: "auto",
    filter: "brightness(70%)",
    marginLeft: "3px",
    marginRight: "3px",
  };

  const currentGuinessStyle = {
    width: "25px",
    height: "auto",
    marginLeft: "1px",
    marginRight: "3px",
    border: "2px solid #FFD700",
  };

  const tooltipMsgs = {
    topScore: "Record de puntaje mas alto",
    wasTopScore: "Fue record de puntaje mas alto",
    isTop3: "Top 3 del ranking",
    highestRound:"Record de mas puntos en una ronda",
    tenOrMore: "Hizo 10 o mas puntos en una ronda"
  }

  return (
    <Box sx={{ display: "flex", height: "25px", my: "5px" }}>
      {isTopScoreInAGame ? (
        <Sticker img={currentGuiness} msg={tooltipMsgs.topScore} guinessStyle={currentGuinessStyle} />
      ) : null}

      {isTop3 ? <Sticker img={podio} msg={tooltipMsgs.isTop3}/> : null}

      {isHighestScoreInARound ? <Sticker img={highestRound} msg={tooltipMsgs.highestRound}/> : null}

      {wasTopScoreInAGame !== 0 &&
        wasTopScoreArray.map((p, index) => {
          return (
            <Sticker
              img={wasGuiness}
              msg={tooltipMsgs.wasTopScore}
              key={index}
              wasTopImage={wasTopImageStyle}
            />
          );
        })}

      {scoredTenOrMoreInARound !== 0 &&
        tenOrMoreArray.map((p, index) => {
          return <Sticker img={diego} msg={tooltipMsgs.tenOrMore} key={index} />;
        })}
    </Box>
  );
}

export default AchievementsBox;
