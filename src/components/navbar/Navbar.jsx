import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { useEffect } from "react";
import api from "../../utils/api-client";
import UserCard from "./UserCard";

const navLinks = [
  {
    title: "Home",
    path: "/",
    icon: <InboxIcon />,
  },
  {
    title: "Jugadores",
    path: "#/players",
    icon: <PersonIcon />,
  },
  {
    title: "Partidas",
    path: "#/games",
    icon: <SportsEsportsIcon />,
  },
  {
    title: "Nueva Partida",
    path: "#/games/new",
    icon: <VideogameAssetIcon />,
  },
  {
    title: "Registrarse",
    path: "#/register",
    icon: <AppRegistrationIcon />,
  },
  {
    title: "Como Jugar",
    path: "#/manual",
    icon: <MenuBookIcon />,
  },
];

// eslint-disable-next-line react/prop-types
function Navbar({dataFromServer}) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setUserData(null);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (user) {
      api
        .getUser(user)
        .then((res) => {
          const { username, image, createdGames } = res.data[0];
          return { username, image, createdGames };
        })
        .then((userObj) => {
          api
            .getPlayer(user)
            .then((res) => {
              const { gamesPlayed, gamesWon, totalScore } = res.data[0];
              const userData = {
                ...userObj,
                gamesPlayed,
                gamesWon,
                totalScore,
              };
              setUserData(userData);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  }, [user]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: "flex" }}
            disabled={dataFromServer === "loading"}
          >
            <MenuIcon />
          </IconButton>
          <IconButton component="a" href="/" sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                color: "white",
                padding: "6px",
                borderRadius: "25%",
                transition: "background 0.3s ease",
                "&:hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
            >
              Altisima
            </Typography>
          </IconButton>
          {userData ? (
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <Avatar src={userData.image} alt="User Avatar" />
            </IconButton>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                maxHeight: "40px",
              }}
            >
              <IconButton component="a" href="#/login" disabled={dataFromServer === "loading"}>
                <Typography
                  sx={{
                    color: "white",
                    padding: "6px",
                    borderRadius: "25%",
                    transition: "background 0.3s ease",
                    "&:hover": {
                      bgcolor: "white",
                      color: "black",
                    },
                  }}
                >
                  Ingresar
                </Typography>
              </IconButton>
              <IconButton component="a" href="#/register" disabled={dataFromServer === "loading"}>
                <Typography
                  sx={{
                    color: "white",
                    padding: "6px",
                    borderRadius: "25%",
                    transition: "background 0.3s ease",
                    "&:hover": {
                      bgcolor: "white",
                      color: "black",
                    },
                  }}
                >
                  Registrarse
                </Typography>
              </IconButton>
            </Box>
          )}
          {/* Menú desplegable */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                width: "200px",
                backgroundImage: `url('https://res.cloudinary.com/dfknsvqer/image/upload/v1688915528/fondo-blanco-menu_snkiu9.jpg')`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid black",
              },
            }}
          >
            {userData ? <UserCard userData={userData} handleLogout={handleLogout}/> : null}
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: "flex" }}
      >
        <NavListDrawer navLinks={navLinks} />
      </Drawer>
    </>
  );
}

export default Navbar;
