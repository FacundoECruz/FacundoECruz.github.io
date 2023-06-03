/* eslint-disable react/prop-types */
import { Button, Container, Typography, Box, Grid } from "@mui/material";

function OptionBox(props) {
  const { message, buttonVariant, buttonText, icon, color } = props;

  return (
    <Container maxWidth="sm">
      <Box sx={{ border: 1, boxShadow: 3, p: 1 }}>
        <Grid container direction="column" justifyContent="center" align="center">
          <Grid item>
            <Typography color="primary" variant="h5" textAlign="center" m={4}>
              {message}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              color={color}
              variant={buttonVariant}
              sx={{ m: 1 }}
              startIcon={icon}
            >
              {buttonText}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default OptionBox;
