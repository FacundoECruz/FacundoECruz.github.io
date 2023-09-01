/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ScoreBoard({ table }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mx: 2,
        mb: 3,
      }}
    >
      <Box sx={{ height: "60px", display: "flex", alignItems: "center" }}>
        <Typography variant="h5" sx={{ color: "white" }}>
          Tabla de posiciones
        </Typography>
      </Box>
      {table.map((player) => {
        return (
          <Accordion
            key={player.username}
            sx={{
              backgroundColor: "black",
              border: "1px solid white",
              width: "100%",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={player.username} src={player.image} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ maxWidth: "50%", flexGrow: 1, color: "white" }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1.2rem", fontWeight: "700" }}
                  >
                    {player.username}
                  </Typography>
                </ListItemText>
                <ListItemText sx={{ textAlign: "right", color: "white" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1.4rem", fontWeight: "700" }}
                  >
                    {player.score}
                  </Typography>
                </ListItemText>
              </ListItem>
            </AccordionSummary>
            <AccordionDetails
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              {player.history.map((roundResult, index) => {
                if (roundResult > 0) {
                  return (
                    <Typography key={index} sx={{ color: "green", fontSize: "20px" }}>
                      {roundResult}
                    </Typography>
                  );
                } else {
                  return (
                    <Typography key={index} sx={{ color: "red", fontSize: "20px" }}>
                      {roundResult}
                    </Typography>
                  );
                }
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}

export default ScoreBoard;
