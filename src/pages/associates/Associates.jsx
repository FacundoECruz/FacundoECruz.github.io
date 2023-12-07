import { useEffect, useState } from "react";
import api from "../../utils/api-client";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import { useAuth } from "../../utils/AuthContext";

function Associates() {
  const [associated, setAssociated] = useState([]);
  const [loading, setLoading] = useState(false);

  const {user} = useAuth()
  const token = window.localStorage.getItem("token")

  useEffect(() => {
    async function getAssociatedPlayers(){
      const associatedResponse = await api.authenticatedRequest(
        `/v1/players/${user}`,
        "GET",
        null,
        token
      );
      setAssociated(associatedResponse.data)
    }
     
    getAssociatedPlayers()
    // api.getAssociatedPlayers(user).then((res) => {
    //   setAssociated(res.data.data);
    // });
  }, [user]);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "@media (min-width: 768px)": {
      width: "50%",
    },
    minHeight: "80vh",
    bgcolor: "blue",
    alignItems: "center",
    backgroundImage:
      "url('https://res.cloudinary.com/dfknsvqer/image/upload/v1700679760/altisima/micro_mzr7ip.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const tableStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "2%",
    margin: "12px 0",
  };

  const rowStyle = { fontSize: "18px" };

  function handleActivatePlayer(index) {
    setLoading(true);
    const playerToActivate = {
      username: associated[index].username,
      email: `${associated[index].username}@altisima.com`,
      password: associated[index].username,
      image: "",
      createdDate: new Date().getTime(),
    };
    api.authenticatedRequest(
      "/v1/users/associate",
      "POST",
      playerToActivate,
      token
    ).then((res) => console.log(res));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Registrado correctamente",
      text: `Usuario: ${associated[index].username}, Contraseña: ${associated[index].username}`,
      showConfirmButton: false,
      width: "50%",
    });
    setAssociated((prevAssociated) =>
      prevAssociated.filter((_, i) => i !== index)
    );
    setLoading(false);
  }

  return (
    <Box sx={containerStyle}>
      <Box component={Paper} sx={tableStyle}>
        <Typography variant="h5">Creados por {user}</Typography>
      </Box>
      {associated.length ? (
        <>
        <TableContainer component={Paper} sx={tableStyle}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Fecha de Creación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {associated.map((player, index) => (
                <TableRow key={index}>
                  <TableCell sx={rowStyle}>{player.username}</TableCell>
                  <TableCell sx={rowStyle}>
                    {new Date(player.createdDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleActivatePlayer(index)}
                      >
                        Dar de Alta
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box component={Paper} sx={tableStyle}>
        <Typography sx={{ fontSize: "13px" }}>
          Al seleccionar DAR DE ALTA se creará un usuario con el nombre del
          jugador. La contraseña va a ser el nombre del jugador, la cual se
          podrá modificar después. El jugador tiene hasta 24 horas después de
          ser dado de alta para ingresar a su cuenta, lo que confirmará la
          creación del usuario.
        </Typography>
      </Box>
      </>
      ) : (
        <Box component={Paper} sx={tableStyle}>
          <Typography>No hay jugadores creados por {user}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default Associates;
