import * as React from "react";

import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExtensionIcon from "@mui/icons-material/Extension";

//avatar src + avatar alt text should be changed to each logged in user's data

export default function MainNavigation() {
  const auth = useContext(AuthContext);

  const [anchorElementNav, setAnchorElementNav] = useState(null);
  const [anchorElementUser, setAnchorElementUser] = useState(null);

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

  return (
    <AppBar position="static">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <ExtensionIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            textTransform="none"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                href="/games"
                component="a"
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">Games</Typography>
              </MenuItem>
              <MenuItem
                href="/events"
                component="a"
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">Events</Typography>
              </MenuItem>
              {!auth.isLoggedIn && (
                <div>
                  <MenuItem
                    href="/login"
                    component="a"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">Log in</Typography>
                  </MenuItem>
                  <MenuItem
                    href="/signup"
                    component="a"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">Join us</Typography>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
          <ExtensionIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
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
          <Box sx={{ ml:2, flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              href="/games"
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
              href="/events"
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
          {!auth.isLoggedIn && (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                href="/login"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                }}
              >
                Log in
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                href="/signup"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                }}
              >
                Join us
              </Button>
            </Box>
          )}

          {auth.isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: "primary.dark" }}
                >
                  <Avatar
                    alt="Lena K"
                    src="/static/images/avatar/2.jpg"
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
                  href="/userId/events"
                  component="a"
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">My Events</Typography>
                </MenuItem>
                <MenuItem
                  href="/userId/createEvent"
                  component="a"
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">Create New Event</Typography>
                </MenuItem>
                <MenuItem
                  href="/logout"
                  component="a"
                  onClick={handleCloseUserMenu}
                >
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
