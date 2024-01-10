import React, { useState } from "react";
import { useAuth } from "../../../utils/firebase";

import MobileNavMenu from "./mobile/MobileNavMenu";
import DesktopAuthLinks from "./desktop/DesktopAuthLinks";
import DesktopNavLinks from "./desktop/DesktopNavLinks"
import SiteName from "./Typography/SiteName"
import UserAvatarMenu from "./UserAvatarMenu"

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

export default function NavigationBar() {
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
          />
          <SiteName />
          <DesktopNavLinks handleCloseNavMenu={handleCloseNavMenu} />
          {!currentUser && (
            <DesktopAuthLinks handleCloseNavMenu={handleCloseNavMenu} />
          )}
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
