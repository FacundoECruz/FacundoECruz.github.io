import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageWithChangeButton from "../edit/ImageWithChangeButton";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../utils/AuthContext";
import { useContext } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.youtube.com/watch?v=mzMPcl7vhQo">
        Altisima
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// eslint-disable-next-line react/prop-types
export default function SignInSide() {
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  const { user, register, error } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      navigate("/");
    } 
    setImageUrl(
      "https://res.cloudinary.com/dfknsvqer/image/upload/v1689874326/empty_user_jyenqo.jpg"
    );
  }, [navigate, user]);

  useEffect(() => {
    console.log("status");
    console.log(status);
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const { email, password, username } = e.target.elements;
    const formData = {
      username: username.value,
      email: email.value,
      password: password.value,
      image: imageUrl,
    };

    register(formData);

    setStatus("idle");
  };

  const styles = {
    paperContainer: {
      background:
        " url('https://res.cloudinary.com/dfknsvqer/image/upload/v1687094811/istockphoto-1212342896-612x612-1_dlvflo.jpg')",
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
          <Avatar sx={{ m: 1, bgcolor: "green" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
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
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
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
            <br />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar usuario"
            />
            <Box>
              <ImageWithChangeButton
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
              />
            </Box>
            {error ? (
              <Typography sx={{ color: "red" }}>{error}</Typography>
            ) : null}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              {status === "loading" ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Registrarse"
              )}
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
