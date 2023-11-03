/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import { types } from "../../../../utils/reducerTypes";
import Swal from "sweetalert2";

function ScoreboardControlButtons({
  round,
  dispatch,
  backToForm,
  nextRound,
  prevRound,
  status,
  setPlayAgain,
  varCheck,
  finishGame,
}) {

function endGame(){
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: 'Partida terminada',
    showConfirmButton: false,
    timer: 1500
  })

  nextRound()
  finishGame()
}

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {round < 10 ? (
        <Button
          variant="contained"
          sx={{
            bgcolor: "lightblue",
            color: "black",
            "&:hover": {
              bgcolor: "white",
            },
          }}
          onClick={() => dispatch({ type: types.clean })}
        >
          Limpiar
        </Button>
      ) : (
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
      )}

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

      <Button
        variant="contained"
        sx={{
          bgcolor: "purple",
          "&:hover": {
            bgcolor: "white",
          },
        }}
        onClick={() => prevRound()}
        disabled={ round === 1 || varCheck || round > 9 }
      >
        <UndoIcon sx={{ color: "black" }} />
      </Button>
    </Box>
  );
}

export default ScoreboardControlButtons;
