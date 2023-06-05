import { Button, Drawer } from "@mui/material";
import "../../stylesheets/Navbar.css";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>

      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer />
      </Drawer>
    </>
  );
}

export default Navbar;
