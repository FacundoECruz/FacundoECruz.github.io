/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import Swal from "sweetalert2";

function ScoreboardControlButtons({
  round,
  backToForm,
  nextRound,
  prevRound,
  status,
  setPlayAgain,
  varCheck,
}) {
  function endGame() {
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Partida terminada",
      showConfirmButton: false,
      timer: 1500,
    });

    nextRound();
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Button
        variant="contained"
        sx={{
          bgcolor: "purple",
          "&:hover": {
            bgcolor: "white",
          },
        }}
        onClick={() => prevRound()}
        disabled={round === 1 || varCheck || round > 9}
      >
        <UndoIcon sx={{ color: "black" }} />
      </Button>
      {round > 10 ? (
        <Button
          onClick={() => backToForm()}
          sx={{
            "&:hover": {
              color: "white",
            },
          }}
        >
          Volver al form
        </Button>
      ) : null}

      {round < 9 ? (
        <Button
          onClick={nextRound}
          variant="contained"
          sx={{
            color: "white",
            "&:hover": {
              color: "black",
              bgcolor: "white",
            },
          }}
        >
          {varCheck ? "Confirmar" : "Siguiente Ronda"}
        </Button>
      ) : round === 9 && status === "in progress" ? (
        <Button
          onClick={() => endGame()}
          sx={{
            color: "white",
            border: "1px solid blue",
            padding: "8px",
            "&:hover": {
              color: "black",
              bgcolor: "white",
            },
          }}
        >
          Siguiente
        </Button>
      ) : (
        <Button
          onClick={() => setPlayAgain()}
          sx={{
            "&:hover": {
              color: "white",
            },
          }}
        >
          Jugar de nuevo
        </Button>
      )}
    </Box>
  );
}

export default ScoreboardControlButtons;
