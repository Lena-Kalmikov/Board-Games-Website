import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import styled from "@mui/system/styled";
import Typography from "@mui/material/Typography";

export function DesktopAuthLinks({ handleCloseNavMenu }) {
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
    <Box sx={{ display: { xs: "none", sm: "flex" } }}>
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
    </Box>
  );
}
