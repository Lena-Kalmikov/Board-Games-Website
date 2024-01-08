import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, useAuth } from "../../../firebase";
import { DesktopAuthLinks } from "./DesktopAuthLinks";
import { DesktopNavLinks } from "./DesktopNavLinks";
import { NavMenu } from "./NavMenu";
import { SiteName } from "./SiteName";
import { UserMenu } from "./UserMenu";


import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import styled from "@mui/system/styled";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

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

  const StyledTypography = styled(Typography)({
    color: "inherit",
    fontSize: 17,
    textDecoration: "none",
    margin: 7,
    "&:hover": {
      fontSize: 18,
    },
  });

  const StyledSiteNameTypography = styled(Typography)({
    marginRight: 2,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: "0.3rem",
    textDecoration: "none",
    fontSize: 26,
  });

    return (
    <AppBar position="static">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <SiteName display={{ xs: "none", sm: "flex" }} fontSize={26} hoverFontSize={28} />
          <NavMenu anchorElementNav={anchorElementNav} handleCloseNavMenu={handleCloseNavMenu} currentUser={currentUser} />
          <SiteName display={{ xs: "flex", sm: "none" }} fontSize={25} hoverFontSize={28} />
          <DesktopNavLinks handleCloseNavMenu={handleCloseNavMenu} />
          {!currentUser && <DesktopAuthLinks handleCloseNavMenu={handleCloseNavMenu} />}
          {currentUser && <UserMenu handleOpenUserMenu={handleOpenUserMenu} currentUser={currentUser} />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

  // return (
  //   <AppBar position="static">
  //     <Container maxWidth="xxl">
  //       <Toolbar disableGutters>
  //         <StyledSiteNameTypography
  //           noWrap
  //           component={Link}
  //           to="/"
  //           color="background.siteName"
  //           sx={{
  //             display: { xs: "none", sm: "flex" },
  //             "&:hover": {
  //               fontSize: 28,
  //             },
  //           }}
  //         >
  //           PlayDate
  //         </StyledSiteNameTypography>
  //         <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
  //           <IconButton
  //             size="large"
  //             onClick={handleOpenNavMenu}
  //             color="inherit"
  //           >
  //             <MenuIcon />
  //           </IconButton>
  //           <Menu
  //             anchorEl={anchorElementNav}
  //             anchorOrigin={{
  //               vertical: "bottom",
  //               horizontal: "left",
  //             }}
  //             keepMounted
  //             transformOrigin={{
  //               vertical: "top",
  //               horizontal: "left",
  //             }}
  //             open={Boolean(anchorElementNav)}
  //             onClose={handleCloseNavMenu}
  //             sx={{
  //               display: { xs: "block", sm: "none" },
  //             }}
  //           >
  //             <MenuItem
  //               component={Link}
  //               to="/games"
  //               onClick={handleCloseUserMenu}
  //             >
  //               <Typography textAlign="center">Games</Typography>
  //             </MenuItem>
  //             <MenuItem
  //               component={Link}
  //               to="/events"
  //               onClick={handleCloseUserMenu}
  //             >
  //               <Typography textAlign="center">Events</Typography>
  //             </MenuItem>

  //             {!currentUser && (
  //               <div>
  //                 <MenuItem
  //                   component={Link}
  //                   to="/login"
  //                   onClick={handleCloseUserMenu}
  //                 >
  //                   <Typography textAlign="center">Log in</Typography>
  //                 </MenuItem>
  //                 <MenuItem
  //                   component={Link}
  //                   to="/signup"
  //                   onClick={handleCloseUserMenu}
  //                 >
  //                   <Typography textAlign="center">Join us</Typography>
  //                 </MenuItem>
  //               </div>
  //             )}
  //           </Menu>
  //         </Box>
  //         <StyledSiteNameTypography
  //           noWrap
  //           component={Link}
  //           to="/"
  //           color="background.siteName"
  //           sx={{
  //             display: { xs: "flex", sm: "none" },
  //             flexGrow: 1,
  //             fontSize: 25,
  //             "&:hover": {
  //               fontSize: 28,
  //             },
  //           }}
  //         >
  //           PlayDate
  //         </StyledSiteNameTypography>
  //         <Box
  //           sx={{
  //             marginLeft: 2,
  //             flexGrow: 1,
  //             display: { xs: "none", sm: "flex" },
  //             alignItems: "center",
  //             alignContent: "center",
  //           }}
  //         >
  //           <StyledTypography
  //             onClick={handleCloseNavMenu}
  //             component={Link}
  //             to="/games"
  //           >
  //             Games
  //           </StyledTypography>
  //           <StyledTypography
  //             onClick={handleCloseNavMenu}
  //             component={Link}
  //             to="/events"
  //           >
  //             Events
  //           </StyledTypography>
  //         </Box>
  //         {!currentUser && (
  //           <Box sx={{ display: { xs: "none", sm: "flex" } }}>
  //             <StyledTypography
  //               onClick={handleCloseNavMenu}
  //               component={Link}
  //               to="/login"
  //             >
  //               Log in
  //             </StyledTypography>
  //             <StyledTypography
  //               onClick={handleCloseNavMenu}
  //               component={Link}
  //               to="/signup"
  //             >
  //               Join us
  //             </StyledTypography>
  //           </Box>
  //         )}

  //         {currentUser && (
  //           <Box sx={{ flexGrow: 0 }}>
  //             <Tooltip title="Open settings">
  //               <IconButton
  //                 onClick={handleOpenUserMenu}
  //                 sx={{ p: 0, color: "primary.dark" }}
  //               >
  //                 <Avatar
  //                   alt={currentUser?.firstName}
  //                   src={currentUser?.photoURL}
  //                   sx={{ backgroundColor: "rgba(247, 154, 70, 0.8)" }}
  //                 />
  //               </IconButton>
  //             </Tooltip>
  //             <Menu
  //               sx={{ marginTop: "45px" }}
  //               anchorEl={anchorElementUser}
  //               anchorOrigin={{
  //                 vertical: "top",
  //                 horizontal: "right",
  //               }}
  //               keepMounted
  //               transformOrigin={{
  //                 vertical: "top",
  //                 horizontal: "right",
  //               }}
  //               open={Boolean(anchorElementUser)}
  //               onClose={handleCloseUserMenu}
  //             >
  //               <MenuItem
  //                 component={Link}
  //                 to={`/${currentUser.uid}/myEvents`}
  //                 onClick={handleCloseUserMenu}
  //               >
  //                 <Typography textAlign="center">My Events</Typography>
  //               </MenuItem>
  //               <MenuItem
  //                 component={Link}
  //                 to={`/${currentUser.uid}/createEvent`}
  //                 onClick={handleCloseUserMenu}
  //               >
  //                 <Typography textAlign="center">Create New Event</Typography>
  //               </MenuItem>
  //               <MenuItem component="a" onClick={handleLogout}>
  //                 <Typography textAlign="center">Logout</Typography>
  //               </MenuItem>
  //             </Menu>
  //           </Box>
  //         )}
  //       </Toolbar>
  //     </Container>
  //   </AppBar>
  // );

