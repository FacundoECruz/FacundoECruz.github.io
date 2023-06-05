import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

function NavListDrawer() {
  return (
    <Box sx={{ width: 250, bgcolor: "lightsalmon" }}>
      <nav>
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/players">
              <ListItemIcon>#</ListItemIcon>
              <ListItemText primary="Jugadores" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/games">
              <ListItemIcon>&</ListItemIcon>
              <ListItemText primary="Partidas" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav>
        <List>
          <ListItem>
            <ListItemText primary="Reglas"/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Algo más"/>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

export default NavListDrawer;
