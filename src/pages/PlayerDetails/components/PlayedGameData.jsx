import { Grid, Typography, Tooltip, Button } from "@mui/material";
import { player } from "./fakePlayerData";

function PlayedGameData() {
  return (
    <Grid container display="flex" direction="row">
      {player.games.map((game) => {
        return (
          <Grid item xl={5} boxShadow={2} key={game.id} m={1}>
            <Typography variant="p">{game.date}</Typography>
            <Grid container display="flex" direction="column">
              {game.results.map((player) => {
                return (
                  <Grid item m={1} key={player.player}>
                    <Tooltip title="View profile" arrow>
                      <Button sx={{ minHeight: "45px" }} variant="contained">
                        {player.player} {player.score}
                      </Button>
                    </Tooltip>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default PlayedGameData;
