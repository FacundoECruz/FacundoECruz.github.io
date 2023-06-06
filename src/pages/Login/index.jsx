import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import AddReactionIcon from "@mui/icons-material/AddReaction";

function Login() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1>Login</h1>

      <Button
        variant="contained"
        sx={{ bgcolor: "green", mt: 2 }}
        onClick={() => setOpen(true)}
      >
        Completar
      </Button>

      <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
        <Alert
          severity="success"
          icon={<AddReactionIcon />}
        >
          Se ha completado correctamente
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;
