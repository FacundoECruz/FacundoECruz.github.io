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
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useEffect } from "react";
import api from "../../utils/api-client";
import UserCard from "./UserCard";
import { useAuth } from "../../utils/AuthContext";

// eslint-disable-next-line react/prop-types
function Navbar({ dataFromServer }) {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const round = window.localStorage.getItem("round");

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
      title: round != null && round > 1 ? "Continuar Partida" : "Nueva Partida",
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
    {
      title: "Records",
      path: "#/achievements",
      icon: <EmojiEventsIcon />,
    },
  ];

  useEffect(() => {
    if (user) {
      const token = window.localStorage.getItem("token")
      api
        .authenticatedRequest(`/users/${user}`, "GET", null, token)
        .then((res) => {
          const { username, image, createdGames } = res;
          return { username, image, createdGames };
        })
        .then((userObj) => {
          api
            .getPlayer(user)
            .then((res) => {
              const { gamesPlayed, gamesWon, totalScore } = res.data;
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
              <IconButton
                component="a"
                href="#/login"
                disabled={dataFromServer === "loading"}
              >
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
              <IconButton
                component="a"
                href="#/register"
                disabled={dataFromServer === "loading"}
              >
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
            {userData ? (
              <UserCard
                userData={userData}
                handleLogout={handleLogout}
                close={setAnchorEl}
              />
            ) : null}
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: "flex" }}
      >
        <NavListDrawer navLinks={navLinks} onClose={() => setOpen(false)} />
      </Drawer>
    </>
  );
}

export default Navbar;
