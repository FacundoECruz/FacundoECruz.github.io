/* eslint-disable react/prop-types */
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

function NavListDrawer({ navLinks }) {
  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dfknsvqer/image/upload/v1686777876/hin-bong-yeung-jF946mh5QrA-unsplash_ccwnix.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ width: 250 }}>
        <nav>
          <List>
            {navLinks.map((item) => (
              <ListItem disablePadding key={item.title}>
                <ListItemButton component="a" href={item.path}>
                  <ListItemIcon sx={{color: "white"}}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} sx={{color: "white"}}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    </div>
  );
}

export default NavListDrawer;
