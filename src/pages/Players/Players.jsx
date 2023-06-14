import { useState, useEffect } from "react";
import api from "../../utils/api-client.js";
import { Box, Container } from "@mui/material";
import PlayerCard from "../../components/PlayerCard";
import { Link } from "react-router-dom";

function Players() {
  const [players, setPlayers] = useState(null);

  console.log(players);

  useEffect(() => {
    api
      .getPlayers()
      .then((response) => setPlayers(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      style={{
        position: "relative",
        background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dfknsvqer/image/upload/v1686776538/mike-perez-aslf3jEpDBI-unsplash_zee7cp.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {players
            ? players.map((p) => {
                return (
                  <Link to={`/players/${p._id}`} key={p.username}>
                    <PlayerCard image={p.image} username={p.username} />
                  </Link>
                );
              })
            : null}
        </Box>
      </Container>
    </div>
  );
}

export default Players;
