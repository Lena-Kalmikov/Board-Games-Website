import React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import styled from "@mui/system/styled";

import Typography from "@mui/material/Typography";

export function DesktopNavLinks({ handleCloseNavMenu }) {
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
        display: { xs: "none", sm: "flex" },
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
    </Box>
  );
}
