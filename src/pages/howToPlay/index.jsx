import { Grid } from "@mui/material";
import FaqItem from "./components/FaqItem";
import HowToPlayAnswer from "./components/HowToPlayAnswer";
import CardsPerRoundAnswer from "./components/CardsPerRoundAnswer";
import DynamicsOfTheRound from "./components/DynamicsOfTheRound";
import ScorePointsAnswer from "./components/ScorePointsAnswer";
import HowToWinAnswer from "./components/HowToWinAnswer";
import WhatDoYouNeedAnswer from "./components/WhatDoYouNeedAnswer";
import HowToUseTheScoreboard from "./components/HowToUseTheScoreboard";

function PlayersGuide() {
  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://res.cloudinary.com/dfknsvqer/image/upload/v1695066559/howtoplay-fondo_cjq7f9.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
        minHeight: "85vh",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "5px",
        }}
      >
        <Grid item md={6} sm={12}>
        <FaqItem
            question="¿Qué necesitás?"
            answer={<WhatDoYouNeedAnswer />}
          />
          <FaqItem
            question="¿Cómo es el juego?"
            answer={<HowToPlayAnswer />}
          />
          <FaqItem
            question="¿Cuántas cartas se reparten por ronda?"
            answer={<CardsPerRoundAnswer />}
          />
          <FaqItem
            question="¿Cómo se juega cada ronda?"
            answer={<DynamicsOfTheRound />}
          />
          <FaqItem
            question="¿Cómo se suman puntos?"
            answer={<ScorePointsAnswer />}
          />
          <FaqItem
            question="¿Cómo se gana una partida?"
            answer={<HowToWinAnswer />}
          />
          <FaqItem
            question="¿Cómo usar el anotador?"
            answer={<HowToUseTheScoreboard />}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default PlayersGuide;
