/* eslint-disable react/prop-types */
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FaqItem({question, answer}) {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Accordion expanded={expanded} onChange={handleAccordionChange} sx={{bgcolor: "black"}}>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}>
        <Typography variant="h6" sx={{color: "white"}}>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{color: "white"}}>{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default FaqItem;
