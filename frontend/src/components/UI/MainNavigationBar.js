import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";
import ExtensionIcon from "@mui/icons-material/Extension";

export default function MainNavigation() {
  const [anchorElementNav, setAnchorElementNav] = useState(null);
  const [anchorElementUser, setAnchorElementUser] = useState(null);

  const navigate = useNavigate();
  const { logout, isLoggedIn, user } = useAuth();

  const userProfilePicture = user?.profilePicture;
  const userName = `${user?.firstName} ${user?.lastName}`;

  const handleOpenNavMenu = (event) => {
    setAnchorElementNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElementUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElementNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElementUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setAnchorElementUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <ExtensionIcon sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            textTransform="none"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", sm: "flex" },
              fontFamily: "monospace",
              fontSize: 25,
              fontWeight: 700,
              letterSpacing: "0.3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PlayDate
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <MenuItem
                component={Link}
                to="/games"
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">Games</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/events"
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">Events</Typography>
              </MenuItem>
              {!isLoggedIn && (
                <div>
                  <MenuItem
                    component={Link}
                    to="/login"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">Log in</Typography>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/signup"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">Join us</Typography>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
          <ExtensionIcon sx={{ display: { xs: "flex", sm: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", sm: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PlayDate
          </Typography>
          <Box sx={{ ml: 2, flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              component={Link}
              to="/games"
              sx={{
                color: "white",
                display: "block",
                textTransform: "none",
                fontSize: 16,
              }}
            >
              Games
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              component={Link}
              to="/events"
              sx={{
                color: "white",
                display: "block",
                textTransform: "none",
                fontSize: 16,
              }}
            >
              Events
            </Button>
          </Box>
          {!isLoggedIn && (
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                component={Link}
                to="/login"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                  fontSize: 16,
                }}
              >
                Log in
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                component={Link}
                to="/signup"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                  fontSize: 16,
                }}
              >
                Join us
              </Button>
            </Box>
          )}

          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: "primary.dark" }}
                >
                  <Avatar
                    alt={userName}
                    src={userProfilePicture}
                    sx={{ backgroundColor: "rgba(247, 154, 70, 0.8)" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElementUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElementUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  component={Link}
                  to="/myEvents"
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">My Events</Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/createEvent"
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">Create New Event</Typography>
                </MenuItem>
                <MenuItem component="a" onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
