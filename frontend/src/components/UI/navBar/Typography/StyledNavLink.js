import { Link } from "react-router-dom";
import styled from "@mui/system/styled";
import Typography from "@mui/material/Typography";

export function StyledNavLink({ children, to, onClick }) {
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
      <StyledTypography component={Link} to={to} onClick={onClick}>
        {children}
      </StyledTypography>
  );
}
