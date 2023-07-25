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
    <Accordion expanded={expanded} onChange={handleAccordionChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default FaqItem;
