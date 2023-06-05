import { Paper, Typography } from "@mui/material";
import { player } from "./fakePlayerData";
import styled from "@emotion/styled";

function PresentationCard() {
  const Img = styled("img")({
    width: 200,
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  });

  return (
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
  );
}

export default PresentationCard;
