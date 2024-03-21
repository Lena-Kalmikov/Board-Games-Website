import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/firebase";
import "./CallToAction.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CallToAction() {
  const currentUser = useAuth();
  const navigate = useNavigate();

  const handleRedirectToCreateNewEvent = () => {
    if (!currentUser) {
      navigate("/login", {
        state: { from: `/${currentUser?.uid}/createEvent` },
      });
      return;
    }
    navigate(`/${currentUser.uid}/createEvent`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        backgroundColor: "background.paper",
        margin: { xs: 2, md: "auto" },
        padding: 3,
        maxWidth: 900,
        boxShadow: 4,
      }}
    >
      <Box marginLeft={2} >
        <Typography
          marginBottom={1}
          fontWeight={"bold"}
          color={"secondary.main"}
          sx={{
            fontSize: { xs: "1.3rem", sm: "1.6rem", md: "1.7rem" },
          }}
        >
          Start crafting your event now.
        </Typography>
        <Typography
          sx={{ marginRight: 3, fontSize: { xs: "1rem", sm: "1.2rem" } }}
        >
          From classic board games to the latest releases, our platform is your
          canvas for creating memorable gatherings. Let the games begin and the
          laughter echo, forge new friendships and make every playdate an event
          to remember!
        </Typography>
      </Box>
      <Box
        sx={{
          alignSelf: { xs: "flex-start", md: "center" },
        }}
      >
        <Button
          onClick={handleRedirectToCreateNewEvent}
          variant="outlined"
          className="button"
          sx={{
            padding: 2,
            marginLeft: 2,
            marginRight: 1,
            marginTop: 3,
            marginBottom: 1,
            height: "3.2rem",
            width: "14rem",
            color: "secondary.main",
          }}
        >
          Create new event
        </Button>
      </Box>
    </Box>
  );
}
