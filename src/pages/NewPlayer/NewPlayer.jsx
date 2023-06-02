import { Button, Container, Typography, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

function NewPlayer() {
  return (
    <Container maxWidth="sm">
      <h1>New Player page</h1>
      <Box sx={{ border: 1, boxShadow: 3, p: 1 }}>
        <Typography color="primary" variant="h5" textAlign="center" m={4}>
          Aca vas a poder crear un jugador
        </Typography>
        <Button variant="contained" sx={{m: 1}} startIcon={<AddIcon />}>New</Button>
        <Button variant="outlained" sx={{m: 1}} startIcon={<ConnectWithoutContactIcon />}>Asociate</Button>
      </Box>
    </Container>
  );
}

export default NewPlayer;
