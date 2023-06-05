import { Container, Grid } from "@mui/material";
import PresentationCard from "./PresentationCard";
import PlayedGameData from "./PlayedGameData";

function DefaultPlayerCard() {
  return (
    <Container>
      <Grid container mt={4} spacing={2}>
        <Grid item xl={6}>
          <PresentationCard />
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
