import StyledNavLink  from "../Typography/StyledNavLink";
import Box from "@mui/material/Box";

export default function DesktopAuthLinks({ handleCloseNavMenu }) {
  return (
    <Box sx={{ display: { xs: "none", sm: "flex" } }}>
      <StyledNavLink onClick={handleCloseNavMenu} to="/login">
        Log in
      </StyledNavLink>
      <StyledNavLink onClick={handleCloseNavMenu} to="/signup">
        Join us
      </StyledNavLink>
    </Box>
  );
}
