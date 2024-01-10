import { Link } from "react-router-dom";

import styled from "@mui/system/styled";
import Typography from "@mui/material/Typography";

export default function SiteName() {
  const StyledSiteNameTypography = styled(Typography)({
    marginRight: 2,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: "0.3rem",
    textDecoration: "none",
    fontSize: 26,
    "&:hover": {
      fontSize: 28,
    },
  });

  return (
    <StyledSiteNameTypography
      noWrap
      component={Link}
      to="/"
      color="background.siteName"
      sx={{
        flexGrow: { xs: 1, sm: 0 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        
      }}
    >
      PlayDate
    </StyledSiteNameTypography>
  );
}
