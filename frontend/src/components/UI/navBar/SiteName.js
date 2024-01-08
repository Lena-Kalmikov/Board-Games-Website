import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";

export function SiteName({ display, fontSize, hoverFontSize }) {
  const StyledSiteNameTypography = styled(Typography)({
    marginRight: 2,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: "0.3rem",
    textDecoration: "none",
    fontSize: fontSize,
    "&:hover": {
      fontSize: hoverFontSize,
    },
  });

  return (
    <StyledSiteNameTypography
      noWrap
      component={Link}
      to="/"
      color="background.siteName"
      sx={{
        display: display,
      }}
    >
      PlayDate
    </StyledSiteNameTypography>
  );
}
