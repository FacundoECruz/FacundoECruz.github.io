/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import api from "../../utils/api-client.js";
import { Box } from "@mui/material";
import PlayerCard from "../../components/playerCard/index.jsx";
import PlayerModal from "./PlayerModal.jsx";
import { checkPlayerAchievements } from "./utils/checkPlayerAchievements.js";

function Players() {
  const [players, setPlayers] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [achievements, setAchievements] = useState(null);

  useEffect(() => {
    api
      .getPlayers()
      .then((response) => {
        console.log(response.data)
        const sortedPlayers = response.data.sort(
          (a, b) => b.wonInCurrentSeason - a.wonInCurrentSeason
        );
        setPlayers(sortedPlayers);
      })
      .catch((error) => console.log(error));
      const ach = JSON.parse(window.localStorage.getItem("achievements"))
      setAchievements(ach);
  }, []);

  const handlePlayerCardClick = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dfknsvqer/image/upload/v1686776538/mike-perez-aslf3jEpDBI-unsplash_zee7cp.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: "20px",
        }}
      >
        {players
          ? players.map((p) => {
              return (
                <PlayerCard
                  key={p.username}
                  image={p.image}
                  username={p.username}
                  winned={p.wonInCurrentSeason}
                  achievements={checkPlayerAchievements(
                    p.username,
                    achievements
                  )}
                  played={p.gamesPlayed}
                  wonHistory={p.gamesWon}
                  width="45%"
                  margin="10px"
                  onClick={() => handlePlayerCardClick(p)}
                />
              );
            })
          : null}
      </Box>
      {isModalOpen && selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          stats={checkPlayerAchievements(selectedPlayer.username, achievements)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Players;
