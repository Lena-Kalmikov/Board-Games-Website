import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../utils/firebase";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

export default function UserAvatarMenu({ currentUser }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setAnchorEl(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    currentUser && (
      <Box>
        <IconButton
          onClick={handleMenu}
          sx={{ marginRight: { xs: 0, sm: -2 }, marginLeft: 3 }}
        >
          <Avatar
            alt={currentUser?.firstName}
            src={currentUser?.photoURL}
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            component={Link}
            to={`/${currentUser.uid}`}
            onClick={handleClose}
          >
            <Typography textAlign="center">My Events</Typography>
          </MenuItem>
          <MenuItem
            component={Link}
            to={`/${currentUser.uid}/createEvent`}
            onClick={handleClose}
          >
            <Typography textAlign="center">Create New Event</Typography>
          </MenuItem>
          <MenuItem component="a" onClick={handleLogout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    )
  );
}
