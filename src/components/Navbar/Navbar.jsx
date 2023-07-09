import {
  AppBar,
  Box,
  Drawer,
  IconButton,
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
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";

const navLinks = [
  {
    title: "Home",
    path: "/",
    icon: <InboxIcon />,
  },
  {
    title: "Jugadores",
    path: "/players",
    icon: <PersonIcon />,
  },
  {
    title: "Partidas",
    path: "/games",
    icon: <SportsEsportsIcon />,
  },
  {
    title: "Nueva Partida",
    path: "/games/new",
    icon: <VideogameAssetIcon />,
  },
  {
    title: "Registrarse",
    path: "/register",
    icon: <AppRegistrationIcon />,
  },
];

// eslint-disable-next-line react/prop-types
function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: "flex" }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton component="a" href="/" sx={{ flexGrow: 1 }}>
            <Typography variant="h6" >
              Altisima
            </Typography>
          </IconButton>
          {user ? (
            <Box sx={{ display: { sm: "block" } }}>
              <Typography>{user}</Typography>
              <IconButton onClick={() => logout()}>Logout</IconButton>
            </Box>
          ) : (
            <Box sx={{ display: { sm: "block" } }}>
              <IconButton component="a" href="/login">
                Login
              </IconButton>
              <IconButton component="a" href="/register">
                Register
              </IconButton>
            </Box>
          )}
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
