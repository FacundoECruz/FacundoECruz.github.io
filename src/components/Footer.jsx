import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { Box, IconButton } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#000", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60px",
      }}
    >
      <IconButton
        href="https://www.linkedin.com/in/facundo-cruz-321401259/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <LinkedInIcon sx={{color: "blue"}}/>
      </IconButton>
      <IconButton
        href="https://github.com/FacundoECruz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <GitHubIcon sx={{color: "white"}}/>
      </IconButton>
      <IconButton
        href="mailto:facundo.emanuel.cruz.94@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Email"
      >
        <EmailIcon sx={{color: "orange"}}/>
      </IconButton>
    </Box>
  );
}

export default Footer;
