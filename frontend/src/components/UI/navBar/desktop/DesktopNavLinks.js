import { StyledNavLink } from "../Typography/StyledNavLink";
import Box from "@mui/material/Box";

export function DesktopNavLinks({ handleCloseNavMenu }) {
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
      <StyledNavLink onClick={handleCloseNavMenu} to="/games">
        Games
      </StyledNavLink>
      <StyledNavLink onClick={handleCloseNavMenu} to="/events">
        Events
      </StyledNavLink>
    </Box>
  );
}
