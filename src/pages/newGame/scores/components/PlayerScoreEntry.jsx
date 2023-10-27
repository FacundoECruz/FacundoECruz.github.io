/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import PlayerDash from "./PlayerDash";
import { types } from "../../../../utils/reducerTypes";
import { checkPlayerAchievements } from "../../../players/utils/checkPlayerAchievements";

function PlayerScoreEntry({playersRound, dispatch, achievements}) {

  return (
    <Box mb={1}>
      {playersRound.map((p, i) => {
        
        const stats = checkPlayerAchievements(p.username, achievements)

        return (
          <PlayerDash
            player={p}
            key={i}
            index={i}
            dispatch={dispatch}
            types={types}
            achievements={stats}
          />
        );
      })}
    </Box>
  );
}

export default PlayerScoreEntry;
