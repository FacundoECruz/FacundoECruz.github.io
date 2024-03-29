import { Box } from "@mui/material";
import { useEffect } from "react";
import api from "../../utils/api-client";
import { useState } from "react";
import LittleGameCard from "./components/LittleGameCard.jsx";
import { CircularProgress } from "@mui/material";

function Games() {
  const [gamesToDisplay, setGamesToDisplay] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.getGames().then((res) => {
      const allGames = res.data;
      const completedGames = allGames.filter((game) => game.currentRound >= 9);
      completedGames.reverse();
      setGamesToDisplay(completedGames);
      setLoading(false);
    });
  }, []);

  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dfknsvqer/image/upload/v1686776553/zuza-galczynska-c5_eQi4rrjA-unsplash_gaz4ty.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <CircularProgress sx={{color: "white"}}/>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {gamesToDisplay.map((game, i) => {
            return <LittleGameCard game={game} key={i} />;
          })}
        </Box>
      )}
    </div>
  );
}

export default Games;
