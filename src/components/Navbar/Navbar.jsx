import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from '@mui/icons-material/Person';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const navLinks = [
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
    title: "Home",
    path: "/",
    icon: <InboxIcon />,
  },
  {
    title: "Registrarse",
    path: "/register",
    icon: <AppRegistrationIcon />,
  },
];

function Navbar() {
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
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navLinks.map((item) => (
              <Button
                color="inherit"
                key={item.title}
                component="a"
                href={item.path}
              >
                {item.title}
              </Button>
            ))}
          </Box>
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