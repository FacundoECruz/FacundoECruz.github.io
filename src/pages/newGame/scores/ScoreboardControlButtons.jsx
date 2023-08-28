/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import { types } from "../../../utils/reducerTypes";

function ScoreboardControlButtons({
  round,
  dispatch,
  backToForm,
  nextRound,
  prevRound,
  status,
  setPlayAgain,
}) {
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
          Siguiente Ronda
        </Button>
      ) : round === 9 && status === "in progress" ? (
        <Button
          onClick={nextRound}
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
          Finalizar
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
        disabled={round === 1}
      >
        <UndoIcon sx={{ color: "black" }} />
      </Button>
    </Box>
  );
}

export default ScoreboardControlButtons;
