import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase";
import useFadeInEffect from "../../hooks/useFadeInEffect";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CallToAction() {
  const currentUser = useAuth();
  const navigate = useNavigate();
  const isComponentLoaded = useFadeInEffect();

  const redirectToCreateNewEvent = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    navigate(`/${currentUser.uid}/createEvent`);
  };

  return (
    <Fade in={isComponentLoaded} timeout={{ enter: 1500 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          backgroundColor: "background.paper",
          margin: { xs: 1, md: "auto" },
          padding: 2,
          maxWidth: 800,
          boxShadow: 1,
          borderRadius: 5,
        }}
      >
        <Box marginLeft={1}>
          <Typography
            fontSize={22}
            marginBottom={1}
            fontWeight={"bold"}
            color={"secondary.main"}
          >
            Start crafting your event now.
          </Typography>
          <Typography>
            From classic board games to the latest releases, our platform is
            your canvas for creating memorable gatherings. Let the games begin
            and the laughter echo – forge new friendships and make every
            playdate an event to remember!
          </Typography>
        </Box>
        <Box>
          <Button
            onClick={redirectToCreateNewEvent}
            variant="outlined"
            sx={{ padding: 2, margin: 2, width: 200, borderRadius: 50 }}
          >
            Create new event
          </Button>
        </Box>
      </Box>
    </Fade>
  );
}
