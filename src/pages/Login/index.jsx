import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import api from "../../utils/api-client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Altisima
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// eslint-disable-next-line react/prop-types
export default function Login({user}) {
  const [error, setError] = useState("");
  const [userState, setUserState] = useState(user)
  const navigate = useNavigate();

  useEffect(() => {
    if (userState) {
      navigate("/");
    }
  }, [navigate, userState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    api
      .getUsers()
      .then((allUsers) => {
        const selectedUser = allUsers.data.find(
          (el) => el.username === data.get("username")
      );
        if (!selectedUser) {
          setError("Invalid Username or Password")}
          else{
          if (selectedUser.password === data.get("password")) {
            window.localStorage.setItem("user", selectedUser.username);
            setUserState(selectedUser.username)
          } else {
            setError("Invalid Username or Password");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const styles = {
    paperContainer: {
      background:
        "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('https://res.cloudinary.com/dfknsvqer/image/upload/v1687094213/ryan-shumway--n5F3fH0lIY-unsplash_nkbtzn.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        style={styles.paperContainer}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresar
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            {error ? <Typography color="red">{error}</Typography> : null}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar usuario"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvide mi contraseña
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"No tenes cuenta? Registrate!"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
