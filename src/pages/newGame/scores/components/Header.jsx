/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import { useScores } from "../useScores";
import Swal from "sweetalert2";

function InGameHeader({ round, cardsPerRound, varCheck, setGameState }) {
  function terminateGame() {
    Swal.fire({
      title: "Seguro?",
      text: "No se va a guardar la data de la partida",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, salir",
    }).then((result) => {
      if (result.isConfirmed) {
        setGameState("finished");
        window.localStorage.removeItem("cardsPerRound");
        window.localStorage.removeItem("gameId");
        window.localStorage.removeItem("round");
        window.localStorage.setItem("status", JSON.stringify("finished"));
      }
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "60px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {round !== 9 ? (
        <Typography
          variant="h4"
          mr={2}
          sx={{ color: "white", whiteSpace: "nowrap" }}
        >
          Ronda {parseInt(round)}
        </Typography>
      ) : (
        <Typography
          variant="h6"
          mr={2}
          sx={{ color: "white", whiteSpace: "nowrap" }}
        >
          Ultima Ronda
        </Typography>
      )}

      <Typography
        variant="h4"
        mr={2}
        sx={{ color: "white", whiteSpace: "nowrap" }}
      >
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
      ) : !varCheck && round < 10 ? (
        <Button
          onClick={() => {
            terminateGame();
          }}
          sx={{
            color: "red",
            width: "30px",
            height: "30px",
            fontSize: "12px",
            border: "1px solid red",
          }}
        >
          Salir
        </Button>
      ) : null}
    </Box>
  );
}

function FinishedGameHeader() {
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
      <img src="https://res.cloudinary.com/dfknsvqer/image/upload/v1699023114/altisima/messi-copa_ypvk60.gif" style={{zIndex: 1}} />
    </Box>
  );
}

function Header({ round, varCheck, setGameState }) {
  const { cardsPerRound } = useScores();

  return round > 9 ? (
    <FinishedGameHeader />
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
