/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../../utils/api-client";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Paper from "@mui/material/Paper";
import { ImageWithChangeButton as ImageWithChangeButton_ } from "./ImageWithChangeButton.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../../utils/AuthContext";
import Swal from "sweetalert2";
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
      <Link color="inherit" href="https://www.youtube.com/watch?v=mzMPcl7vhQo">
        Altisima
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// eslint-disable-next-line react/prop-types
function Edit({ ImageWithChangeButton = ImageWithChangeButton_ }) {
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [editErrorMsg, setEditErrorMsg] = useState(null);
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    api
      .authenticatedRequest(`/users/${user}`, "GET", null, token)
      .then((res) => {
        console.log(res);
        const { email, image, username } = res;
        setUsername(username);
        setEmail(email);
        setImageUrl(image);
      })
      .catch((err) => console.log(err));
  }, [token, user]);

  const styles = {
    paperContainer: {
      background:
        " url('https://res.cloudinary.com/dfknsvqer/image/upload/v1687094811/istockphoto-1212342896-612x612-1_dlvflo.jpg')",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    const { username } = e.target.elements;
    const pass = e.target.elements.password.value;
    const passForDb = pass === "" ? "" : pass;
    const formData = {
      password: passForDb,
      image: imageUrl,
    };
    console.log(formData)  

    api
      .editUser(username.value, formData)
      .then((res) => {
        setStatus("success");
        setEditErrorMsg(null);
        Swal.fire({
          position: "top-end",
          icon: "success",
          text: "Editado correctamente",
          showConfirmButton: false,
          timer: 1500,
          width: "50%",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err)
        setEditErrorMsg(err.response);
        setStatus("idle");
      });
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100%",
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
          <Avatar sx={{ m: 1, bgcolor: "orange" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Editar Usuario
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
              value={username}
              disabled
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={email}
              autoComplete="email"
              disabled
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              placeholder="Si deja en blanco conservará la que ya tiene"
              autoFocus
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <ImageWithChangeButton
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
              />
            </Box>
            <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
              {status === "loading" ? (
                <CircularProgress />
              ) : status === "success" ? (
                <Button component="a" href="#/">
                  Volver a inicio
                </Button>
              ) : (
                "Guardar Cambios"
              )}
            </Button>
            {editErrorMsg ? (
              <Typography sx={{ color: "red" }}>{editErrorMsg}</Typography>
            ) : null}
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Edit;
