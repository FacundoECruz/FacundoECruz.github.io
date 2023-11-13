/* eslint-disable react/prop-types */
import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import TopTenPlayer from "./components/TopTenPlayer.jsx";
import { useEffect } from "react";

function TopTenModal({ image, imageStyle, players }) {
  const [open, setOpen] = useState(false);
  const [topTenList, setTopTenList] = useState([]);

  useEffect(() => {
    const sortedPlayersByGamesWon = players.sort((a, b) => {
      if (b.gamesWon !== a.gamesWon) {
        return b.gamesWon - a.gamesWon;
      } else {
        return b.totalScore - a.totalScore;
      }
    });
    const top = sortedPlayersByGamesWon.slice(0, 10);
    setTopTenList(top);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const topTenContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    "@media (min-width: 768px)": {
      width: "25%",
    },
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

  return (
    <>
      <img
        src={image}
        onClick={handleOpen}
        style={imageStyle}
      />

      <Modal
        open={open}
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
    </>
  );
}

export default TopTenModal;
