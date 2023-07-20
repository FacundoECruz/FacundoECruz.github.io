import { Container, Grid, Box } from "@mui/material";
import PlayedGameData from "./PlayedGameData";
import PlayerCard from "../../../components/playerCard/index.jsx";
import PlayerCardSkeleton from "../../../components/PlayerCard/PlayerCardSkeleton";
import { player } from "./fakePlayerData";

function DefaultPlayerCard() {

  return (
    <Container>
      <Grid container mt={4} spacing={2}>
        <Grid item xl={6}>
          <Box sx={{ display: "grid", gap: 2, maxWidth: 250, mx: "auto" }}>
            {player ? (
              <PlayerCard
                image={player.image}
                username={player.username}
              />
            ) : (
              <PlayerCardSkeleton />
            )}
          </Box>
        </Grid>
        <Grid item xl={6} md={6}>
          <PlayedGameData />
        </Grid>
      </Grid>
      <Grid container mt={3}>
        <Grid item xl={6}>
          Player Data
        </Grid>
        <Grid item xl={6}>
          Player Data
        </Grid>
      </Grid>
    </Container>
  );
}

export default DefaultPlayerCard;
