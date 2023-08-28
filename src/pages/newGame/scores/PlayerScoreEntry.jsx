/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import PlayerDash from "./PlayerDash";
import { types } from "../../../utils/reducerTypes";

function PlayerScoreEntry({playersRound, dispatch}) {
  return (
    <Box mb={1}>
      {playersRound.map((p, i) => {
        return (
          <PlayerDash
            player={p}
            key={i}
            index={i}
            dispatch={dispatch}
            types={types}
          />
        );
      })}
    </Box>
  );
}

export default PlayerScoreEntry;
