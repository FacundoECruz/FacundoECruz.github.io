/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
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
import { ImageWithChangeButton as ImageWithChangeButton_ } from "../edit/ImageWithChangeButton.jsx";
import { useAuth as _useAuth } from "../../utils/AuthContext";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Tooltip from "@mui/material/Tooltip";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Swal from "sweetalert2";
import api from "../../utils/api-client.js";

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
export default function SignInSide({
  ImageWithChangeButton = ImageWithChangeButton_,
  useAuth = _useAuth,
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [removePlayerToAssociate, setRemovePlayerToAssociate] = useState(false);
  const [options, setOptions] = useState([]);
  const [hasFocus, setHasFocus] = useState(false);
  const navigate = useNavigate();
  const { user, register, registerError, associate } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    setImageUrl(
      "https://res.cloudinary.com/dfknsvqer/image/upload/v1689874326/empty_user_jyenqo.jpg"
    );
  }, [navigate, user]);

  useEffect(() => {
    fetchOptions();
  }, []);

  async function fetchOptions() {
    try {
      const playersResponse = await api.getUnregisteredPlayers();
      const playersUsername = playersResponse.data.map((p) => {
        return p.username;
      });
      setOptions(playersUsername);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, username } = e.target.elements;
    const formData = {
      username: username.value,
      email: email.value,
      password: password.value,
      image: imageUrl,
    };
    if (removePlayerToAssociate) associate(formData);
    else register(formData);
  };

  function handleRemovePlayer() {
    setRemovePlayerToAssociate(false);
    setUsernameValue("");
  }

  function openAssociateOffer() {
    if (!hasFocus) {
      Swal.fire({
        title: "Ya jugaste una partida donde se usó este anotador?",
        text: "Podés asociar tu cuenta al perfil que ya está creado",
        showCancelButton: true,
        confirmButtonText: "Asociar",
        denyButtonText: "Crear nuevo",
      }).then((result) => {
        if (result.isConfirmed) {
          openSearchPlayerToAssociate();
        }
      });
      setHasFocus(true);
    }
  }

  function openSearchPlayerToAssociate() {
    Swal.fire({
      title: "Asociar jugador",
      text: "Si ya tenes un perfil en la base de datos podes asociar sus logros y resultados a tu cuenta",
      input: "select",
      inputOptions: { options },
      inputPlaceholder: "Seleccionar jugador",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value !== "") {
          const selectedValue = result.value;
          setUsernameValue(options[selectedValue]);
          setRemovePlayerToAssociate(true);
        }
      }
    });
  }

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
              label="Usuario"
              name="username"
              onFocus={() => openAssociateOffer()}
              disabled={removePlayerToAssociate}
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {!removePlayerToAssociate ? (
                      <Tooltip title="Asociar con un jugador ya existente">
                        <IconButton
                          edge="end"
                          onClick={() => openSearchPlayerToAssociate()}
                        >
                          <GroupAddIcon sx={{ color: "blue" }} />
                        </IconButton>
                      </Tooltip>
                    ) : null}

                    {removePlayerToAssociate ? (
                      <Tooltip title="Remover">
                        <IconButton
                          edge="end"
                          onClick={() => handleRemovePlayer()}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                  </InputAdornment>
                ),
              }}
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
            {registerError ? (
              <Typography sx={{ color: "red" }}>{registerError}</Typography>
            ) : null}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
