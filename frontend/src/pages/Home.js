// import { useAuth } from "../context/auth-context";
import { useAuth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import useFadeInEffect from "../hooks/useFadeInEffect";
import EventPreviewList from "../components/events/preview/EventPreviewList";
import EventPreviewLoadingSkeleton from "../components/UI/skeletons/EventPreviewLoadingSkeleton";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Links from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Home({ events }) {
  const currentUser = useAuth();
  const isLoading = events.length === 0;

  const isComponentLoaded = useFadeInEffect();

  const navigate = useNavigate();

  const redirectToCreateNewEvent = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    navigate(`/${currentUser.uid}/createEvent`);
  };

  const skeletonNumber = 4;

  return (
    <Box sx={{ margin: 2, marginBottom: 10 }}>
      <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            position: "relative",
            margin: "auto",
            maxWidth: 1000,
            backgroundColor: "background.paper",
            marginTop: { sm: 10 },
            marginBottom: 10,
            borderRadius: 5,
            boxShadow: 1,
          }}
        >
          <Box
            sx={{
              marginLeft: 4,
              width: "100%",
              padding: 2,
            }}
          >
            <Typography
              color={"secondary.main"}
              fontWeight={"bold"}
              fontSize={22}
            >
              Unleash the Board Game Magic!
            </Typography>
            <Typography>
              Embark on a journey of fun and laughter with your friends. Create
              unforgettable moments by hosting your own board game meetup with
              the help of our website. Whether you're a strategic mastermind, a
              trivia guru, or just a casual player, bring your favorite board
              games to the table and let the good times roll. Connect with
              fellow gamers, share your passion, and make lasting memories
              together.
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: "85%", sm: "100%", md: "90%" },
              margin: { sm: 5 },
              marginBottom: { xs: 2 },
            }}
          >
            <img
              alt=""
              src="https://images.pexels.com/photos/4691567/pexels-photo-4691567.jpeg?auto=compress&cs=tinysrgb&w=800"
              style={{
                maxWidth: "100%",
                borderRadius: 50,
              }}
            />
          </Box>
        </Box>
      </Fade>
      <Fade in={isComponentLoaded} timeout={{ enter: 1000 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", xl: "row" },
            alignItems: "center",
            justifyContent: "center",
            // margin: "auto",
            // maxWidth: { md: 900, xl: 1500 },
            // backgroundColor: "rgb(242, 246, 250)",
            marginBottom: 10,
            // backgroundColor: "white",
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: { xs: "wrap" },
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {Array(skeletonNumber)
                .fill()
                .map((index) => (
                  <EventPreviewLoadingSkeleton key={index} />
                ))}
            </Box>
          ) : (
            <Box>
              <EventPreviewList
                events={events.slice(0, 4)}
                justifyContent={"center"}
              />
              <Links
                component={Link}
                to="/events"
                sx={{
                  margin: 1,
                  fontSize: 16,
                  textTransform: "none",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Go to events page for more events
              </Links>
            </Box>
          )}
        </Box>
      </Fade>
      <Fade in={isComponentLoaded} timeout={{ enter: 1500 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            backgroundColor: "background.paper",
            maxWidth: 800,
            padding: 2,
            margin: { xs: 1, md: "auto" },
            borderRadius: 5,
            boxShadow: 1,
          }}
        >
          <Box marginLeft={1}>
            <Typography
              fontWeight={"bold"}
              fontSize={22}
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
    </Box>
  );
}
