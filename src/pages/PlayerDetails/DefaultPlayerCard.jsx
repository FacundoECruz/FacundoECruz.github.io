import {
  Container,
  Paper,
  Grid,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import styled from "@emotion/styled";

function DefaultPlayerCard() {
  const player = {
    id: "default",
    username: "Barack Obama",
    gamesPlayed: 15,
    gamesWon: 2,
    createdGames: 7,
    totalScore: 476,
    games: [
      {
        id: "12343223245",
        date: "23/2/2019",
        results: [
          {
            player: "Barack Obama",
            score: 55,
          },
          {
            player: "Angelina Jolie",
            score: 40,
          },
          {
            player: "Buda",
            score: 38,
          },
          {
            player: "Tatekieto",
            score: 30,
          },
        ],
      },
      {
        id: "12343223245",
        date: "23/2/2019",
        results: [
          {
            player: "Messi",
            score: 60,
          },
          {
            player: "Diego",
            score: 43,
          },
          {
            player: "Barack Obama",
            score: 35,
          },
          {
            player: "Grondona",
            score: 12,
          },
        ],
      },
    ],
  };

  const Img = styled("img")({
    width: 200,
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  });

  return (
    <Container>
      <Grid container mt={4} spacing={2}>
        <Grid item xl={6}>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Img src="https://via.placeholder.com/200" alt="default pic" />
            <Typography variant="h4" ml={5}>
              {player.username}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xl={6} md={6}>
          <Grid container display="flex" direction="row">
            {player.games.map((game) => {
              return (
                <>
                  <Grid item xl={6}>
                    <Typography key={game.id} variant="p">
                      {game.date}
                    </Typography>
                    <Grid container display="flex" direction="column">
                      {game.results.map((player) => {
                        return (
                          <>
                            <Grid item>
                              <Tooltip title="View profile" arrow>
                                <Button sx={{minHeight: "60px"}} variant="contained">
                                  {player.player} {player.score}
                                </Button>
                              </Tooltip>
                            </Grid>
                          </>
                        );
                      })}
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DefaultPlayerCard;
