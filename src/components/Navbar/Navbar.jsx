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
function Navbar({ user, logout }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Altisima
          </Typography>
          {user ? (
            <Box sx={{ display: { sm: "block" } }}>
              <Typography>{user}</Typography>
              <IconButton onClick={() => logout()}>Logout</IconButton>
            </Box>
          ) : (
            <Box sx={{ display: { sm: "block" } }}>
              <IconButton component="a" href="/login">Login</IconButton>
              <IconButton component="a" href="/register">Register</IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <NavListDrawer navLinks={navLinks} />
      </Drawer>
    </>
  );
}

export default Navbar;
