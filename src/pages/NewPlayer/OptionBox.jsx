/* eslint-disable react/prop-types */
import { Button, Container, Typography, Box } from "@mui/material";

function OptionBox(props) {

  const {message, buttonVariant, buttonText, icon, color} = props

  return (
    <Container maxWidth="sm">
      <Box sx={{ border: 1, boxShadow: 3, p: 1 }}>
        <Typography color="primary" variant="h5" textAlign="center" m={4}>
          {message}
        </Typography>
        <Button color={color} variant={buttonVariant} sx={{ m: 1 }} startIcon={icon}>
          {buttonText}
        </Button>
      </Box>
    </Container>
  );
}

export default OptionBox;
