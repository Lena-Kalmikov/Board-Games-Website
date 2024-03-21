import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";

export default function SiteName() {
  return (
    <Typography
      component={Link}
      to="/"
      noWrap
      fontSize={27}
      fontStyle={"italic"}
      fontWeight={700}
      fontFamily={"monospace"}
      marginRight={2}
      display={"flex"}
      justifyContent={"center"}
      color="background.siteName"
      sx={{
        textDecoration: "none",
        letterSpacing: "0.3rem",
        flexGrow: { xs: 1, sm: 0 },
        marginLeft: { xs: 3, sm: 0 },
        "&:hover": {
          textShadow: "0px 0px 6px rgba(145, 230, 231, 0.8)",
          transition: "all 0.2s ease 0s",
        },
      }}
    >
      PlayDate
    </Typography>
  );
}
