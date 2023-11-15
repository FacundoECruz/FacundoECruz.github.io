/* eslint-disable react/prop-types */
import { Box, Modal, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

function GenericAchievementModal({ image, imageStyle, achievement, title, players }) {
  const [open, setOpen] = useState(false);
  const [achievementPlayers, setAchievementsPlayers] = useState([]);

  useEffect(() => {
    achievement.map((a) => {
      setAchievementsPlayers((prevState) => {
        const updatedPlayers = [...prevState];
        const player = buildPlayerData(a);
        updatedPlayers.push(player);
        return updatedPlayers;
      });
    });

    function buildPlayerData(playerData) {
      let player = null;
      if (typeof playerData === "string")
        player = players.find((p) => p.username === playerData);
      else 
        player = players.find((p) => p.username === playerData.username);
      return player;
    }
  }, [achievement, players]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const containerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    "@media (min-width: 768px)": {
      width: "25%",
    },
    bgcolor: "black",
    border: "2px solid gold",
    boxShadow: 24,
    p: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const cardsContainerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  };

  const playerBoxStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "blue",
    alignItems: "center",
    border: "1px solid gold",
    padding: "2px",
    margin: "5px 5px",
  };

  const textStyle = {
    color: "white",
    p: 1,
  };

  const noScoreAchievementCriteria = "Hicieron 10 o más";

  return (
    <div>
      <img src={image} onClick={handleOpen} style={imageStyle} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={containerStyle}>
          <Typography id="modal-modal-title" variant="h6" sx={textStyle}>
            {title}
          </Typography>
          <Box sx={cardsContainerStyle}>
            {achievementPlayers.map((p, i) => (
              <Box key={i} sx={playerBoxStyle}>
                <img src={p.image} style={imageStyle} />
                <Typography variant="h6" sx={textStyle}>
                  {p.username}
                </Typography>
                {!title.includes(noScoreAchievementCriteria) ? (
                  <Typography variant="h6" sx={textStyle}>
                    {achievement[i].score}
                  </Typography>
                ) : null}
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default GenericAchievementModal;
