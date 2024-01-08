import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export function NavMenu({ anchorElementNav, handleCloseNavMenu, currentUser }) {
  const StyledTypography = styled(Typography)({
    color: "inherit",
    fontSize: 17,
    textDecoration: "none",
    margin: 7,
    "&:hover": {
      fontSize: 18,
    },
  });

  return (
    <Box
      sx={{
        marginLeft: 2,
        flexGrow: 1,
        display: { xs: "flex", sm: "none" },
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <StyledTypography
        onClick={handleCloseNavMenu}
        component={Link}
        to="/games"
      >
        Games
      </StyledTypography>
      <StyledTypography
        onClick={handleCloseNavMenu}
        component={Link}
        to="/events"
      >
        Events
      </StyledTypography>
      {!currentUser && (
        <>
          <StyledTypography
            onClick={handleCloseNavMenu}
            component={Link}
            to="/login"
          >
            Log in
          </StyledTypography>
          <StyledTypography
            onClick={handleCloseNavMenu}
            component={Link}
            to="/signup"
          >
            Join us
          </StyledTypography>
        </>
      )}
    </Box>
  );
}