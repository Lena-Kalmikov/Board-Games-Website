import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";

export default function SiteName() {
  return (
    <Typography
      component={Link}
      to="/"
      noWrap
      fontSize={26}
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
        "&:hover": {
          fontSize: 28,
        },
      }}
    >
      PlayDate
    </Typography>
  );
}
