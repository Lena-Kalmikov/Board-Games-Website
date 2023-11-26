import * as React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
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
              fontWeight: 700,
              letterSpacing: ".3rem",
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
                <Typography textAlign="center">Explore Games</Typography>
              </MenuItem>
              <MenuItem
                href="/events"
                component="a"
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">Explore Events</Typography>
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
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              href="/games"
              sx={{
                my: 2,
                color: "white",
                display: "block",
                textTransform: "none",
              }}
            >
              Explore Games
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              href="/events"
              sx={{
                my: 2,
                color: "white",
                display: "block",
                textTransform: "none",
              }}
            >
              Explore Events
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
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Lena K" src="/static/images/avatar/2.jpg" />
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
                  href="/userId/profile"
                  component="a"
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
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
