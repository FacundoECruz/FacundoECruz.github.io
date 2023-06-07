import { useState, useEffect } from "react";
import api from "../../utils/api-client.js";
import { Box, Container, Typography } from "@mui/material";
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
    <Container>
      <Typography variant="h3" sx={{ my: 3 }}>
        Jugadores
      </Typography>
      <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
        {players
          ? players.map((p) => {
              return (
                <Link to={`/players/${p._id}`} key={p.username}>
                <PlayerCard
                  image={p.image}
                  username={p.username}
                />
                </Link>
              );
            })
          : null}
      </Box>
    </Container>
  );
}

export default Players;
