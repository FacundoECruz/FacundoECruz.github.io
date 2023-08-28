/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import { useScores } from "../useScores";

function InGameHeader({ round, cardsPerRound, varCheck, setGameState }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "60px",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" mr={2} sx={{ color: "white" }}>
        Ronda {parseInt(round)}
      </Typography>
      <Typography variant="h4" mr={2} sx={{ color: "white" }}>
        Cartas {cardsPerRound[round - 1]}
      </Typography>
      {varCheck ? (
        <Box sx={{ width: "25%" }}>
          <img
            src="https://res.cloudinary.com/dfknsvqer/image/upload/v1688731292/var_babqf8.jpg"
            alt="pitana-var"
            style={{ width: "50px", height: "50px" }}
          />
        </Box>
      ) : null}
      {round < 10 ? (
        <Button
          onClick={() => {
            setGameState("finished");
            window.localStorage.removeItem("cardsPerRound");
            window.localStorage.removeItem("gameId");
            window.localStorage.removeItem("round");
            window.localStorage.setItem("status", JSON.stringify("finished"));
          }}
          sx={{
            color: "red",
            width: "30px",
            height: "30px",
            fontSize: "8px",
            border: "1px solid red",
          }}
        >
          Terminar partida
        </Button>
      ) : null}
    </Box>
  );
}

function FinishedGameHeader({ table }) {
  return (
    <Box
      sx={{
        height: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography sx={{ color: "white" }}>Partida terminada</Typography>
      <Typography sx={{ color: "white" }}>
        Gana {table[0].username} con {table[0].score} puntos!
      </Typography>
    </Box>
  );
}

function Header({ round, table, varCheck, setGameState }) {
  const { cardsPerRound } = useScores();

  return round > 9 ? (
    <FinishedGameHeader table={table} />
  ) : (
    <InGameHeader
      round={round}
      cardsPerRound={cardsPerRound}
      varCheck={varCheck}
      setGameState={setGameState}
    />
  );
}

export default Header;
