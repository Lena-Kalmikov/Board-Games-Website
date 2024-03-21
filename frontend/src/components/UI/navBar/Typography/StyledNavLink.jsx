import { Link } from "react-router-dom";
import "./StyledNavLink.css";
import Typography from "@mui/material/Typography";

export default function StyledNavLink({ children, to, onClick }) {
  return (
    <Typography
      className="hover-underline-animation"
      component={Link}
      to={to}
      margin={1}
      fontSize={17}
      onClick={onClick}
      height={20}
      sx={{
        color: "inherit",
        textDecoration: "none",
        // "&:hover": {
        //   fontSize: 17.5,
        // },
      }}
    >
      {children}
    </Typography>
  );
}

