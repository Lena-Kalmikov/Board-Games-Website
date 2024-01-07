import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, useAuth } from "../../firebase";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import styled from "@mui/system/styled";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExtensionIcon from "@mui/icons-material/Extension";

export default function MainNavigation() {
  const currentUser = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setAnchorElementUser(null);
      console.log("User logged out successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const StyledButton = styled(Button)({
    color: "inherit",
    display: "block",
    borderRadius: 50,
    textTransform: "none",
    fontSize: 16,
  });

  const StyledTypography = styled(Typography)({
    marginRight: 2,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: "0.3rem",
    color: "#bdfade",
    textDecoration: "none",
  });

  return (
    <AppBar position="static">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <ExtensionIcon
            sx={{
              display: { xs: "none", sm: "flex" },
              marginRight: 1,
              color: "#bdfade",
            }}
          />
          <StyledTypography
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: "none", sm: "flex" },
              fontSize: 25,
            }}
          >
            PlayDate
          </StyledTypography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
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
              {!currentUser && (
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
          <ExtensionIcon
            sx={{
              display: { xs: "flex", sm: "none" },
              marginRight: 1,
              color: "#bdfade",
            }}
          />
          <StyledTypography
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: "flex", sm: "none" },
              flexGrow: 1,
              fontSize: 25,
            }}
          >
            PlayDate
          </StyledTypography>
          <Box
            sx={{
              marginLeft: 2,
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
            }}
          >
            <StyledButton
              onClick={handleCloseNavMenu}
              component={Link}
              to="/games"
            >
              Games
            </StyledButton>
            <StyledButton
              onClick={handleCloseNavMenu}
              component={Link}
              to="/events"
            >
              Events
            </StyledButton>
          </Box>
          {!currentUser && (
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <StyledButton
                onClick={handleCloseNavMenu}
                component={Link}
                to="/login"
                sx={{
                  my: 2,
                }}
              >
                Log in
              </StyledButton>
              <StyledButton
                onClick={handleCloseNavMenu}
                component={Link}
                to="/signup"
                sx={{
                  my: 2,
                }}
              >
                Join us
              </StyledButton>
            </Box>
          )}

          {currentUser && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: "primary.dark" }}
                >
                  <Avatar
                    alt={currentUser?.firstName}
                    src={currentUser?.photoURL}
                    sx={{ backgroundColor: "rgba(247, 154, 70, 0.8)" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ marginTop: "45px" }}
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
                  to={`/${currentUser.uid}/myEvents`}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">My Events</Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={`/${currentUser.uid}/createEvent`}
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
