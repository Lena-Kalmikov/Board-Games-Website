import React, { useState } from "react";
import { useAuth } from "../../../utils/firebase";

import SiteName from "./Typography/SiteName";
import UserAvatarMenu from "./UserAvatarMenu";
import MobileNavMenu from "./mobile/MobileNavMenu";
import DesktopAuthLinks from "./desktop/DesktopAuthLinks";
import DesktopNavLinks from "./desktop/DesktopNavLinks";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import ModeSwitch from "../ModeSwitch";

export default function NavigationBar({ darkMode, setDarkMode, theme }) {
  const currentUser = useAuth();

  const [anchorElementNav, setAnchorElementNav] = useState(null);
  const [setAnchorElementUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElementUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElementNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <MobileNavMenu
            anchorElementNav={anchorElementNav}
            handleCloseNavMenu={handleCloseNavMenu}
            currentUser={currentUser}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            theme={theme}
          />
          <SiteName />
          <DesktopNavLinks handleCloseNavMenu={handleCloseNavMenu} />
          {!currentUser && (
            <DesktopAuthLinks handleCloseNavMenu={handleCloseNavMenu} />
          )}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              marginLeft: 3,
              marginRight: -3,
            }}
          >
            <ModeSwitch
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              theme={theme}
            />
          </Box>
          {currentUser && (
            <UserAvatarMenu
              handleOpenUserMenu={handleOpenUserMenu}
              currentUser={currentUser}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
