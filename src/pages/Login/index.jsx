import { Button } from "@mui/material";
import { useSnackbar } from "notistack";

function Login() {
  const { enqueueSnackbar } = useSnackbar();

  function handleClick() {
    enqueueSnackbar("Completado papu!!!", {
      variant: "success",
    })
  }

  return (
    <>
      <h1>Login</h1>

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleClick}>
        Completar
      </Button>
    </>
  );
}

export default Login;
