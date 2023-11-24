/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PlayerHistory } from "./PlayerHistory";

export function WinnerAccordion({ player }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Accordion
        key={player.username}
        sx={{
          backgroundColor: "black",
          border: "1px solid white",
          width: "100%",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white", marginLeft: "5px" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ color: "green", flexGrow: 1 }}>{player.username}</Typography>
          <Typography sx={{ color: "green", marginLeft: "20px" }}>
            {player.score}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ display: "flex", justifyContent: "space-evenly" }}
        >
          {player.history != null ? (
            <PlayerHistory player={player} />
          ) : (
            <Typography sx={{ color: "white", fontSize: "small" }}>{"No hay datos"}</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
