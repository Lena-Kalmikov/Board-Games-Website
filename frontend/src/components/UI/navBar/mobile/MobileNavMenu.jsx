import { useState } from "react";
import { Link } from "react-router-dom";

import ModeSwitch from "../../ModeSwitch";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

export default function MobileNavMenu({
  currentUser,
  darkMode,
  setDarkMode,
  theme,
}) {
  const [anchorElementNav, setAnchorElementNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElementNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElementNav(null);
  };

  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
      }}
    >
      <IconButton
        size="large"
        onClick={handleOpenNavMenu}
        color="inherit"
        data-testid="menu-button"
      >
        <MenuIcon
          sx={{
            width: 30,
            height: 30,
          }}
        />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorElementNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElementNav)}
        onClose={handleCloseNavMenu}
      >
        <MenuItem component={Link} to="/games" onClick={handleCloseNavMenu}>
          <Typography>Games</Typography>
        </MenuItem>
        <MenuItem component={Link} to="/events" onClick={handleCloseNavMenu}>
          <Typography>Events</Typography>
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
              <Typography>Join us</Typography>
            </MenuItem>
          </div>
        )}
        <MenuItem>
          <ModeSwitch
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            theme={theme}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
}
