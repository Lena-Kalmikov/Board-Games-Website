import { useState } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

export function MobileNavMenu({ currentUser }) {
  const [anchorElementNav, setAnchorElementNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElementNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElementNav(null);
  };

  return (
    <Box sx={{ display: { xs: "flex", sm: "none" } }}>
      <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorElementNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElementNav)}
        onClose={handleCloseNavMenu}
      >
        <MenuItem component={Link} to="/games" onClick={handleCloseNavMenu}>
          <Typography textAlign="center">Games</Typography>
        </MenuItem>
        <MenuItem component={Link} to="/events" onClick={handleCloseNavMenu}>
          <Typography textAlign="center">Events</Typography>
        </MenuItem>

        {!currentUser && (
          <div>
            <MenuItem component={Link} to="/login" onClick={handleCloseNavMenu}>
              <Typography textAlign="center">Log in</Typography>
            </MenuItem>
            <MenuItem
              component={Link}
              to="/signup"
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">Join us</Typography>
            </MenuItem>
          </div>
        )}
      </Menu>
    </Box>
  );
}