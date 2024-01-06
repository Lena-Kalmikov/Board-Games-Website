import { useAuth } from "../../firebase";
import { Link, useParams } from "react-router-dom";
import UserEventsLoadingSkeleton from "../../components/UI/skeletons/UserEventsLoadingSkeleton";
import EventPreviewList from "../../components/events/preview/EventPreviewList";
import Links from "@mui/material/Link";
import useFadeInEffect from "../../hooks/useFadeInEffect";

import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { Typography } from "@mui/material";

export default function UserEvents({ events }) {
  const isComponentLoaded = useFadeInEffect();

  const { userId } = useParams();
  const currentUser = useAuth();
  const isLoading = events.length === 0;

  if (isLoading) {
    return <UserEventsLoadingSkeleton />;
  }

  if (currentUser?.uid === userId) {
    const eventsCreatedByUser = events.filter(
      (event) => event.creator === userId
    );
    const eventsCreatedByUserLength = eventsCreatedByUser.length > 0;

    const eventsUserIsGoingTo = events.filter((event) =>
      event?.participants?.includes(userId)
    );
    const eventsUserIsGoingToLength = eventsUserIsGoingTo.length > 0;

    return (
      <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
        <Box
          margin={5}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
        >
          <Typography variant="h5">Events created by me:</Typography>
          {eventsCreatedByUserLength ? (
            <EventPreviewList events={eventsCreatedByUser} />
          ) : (
            <Typography>
              No events found.{" "}
              <Links component={Link} to={`/${currentUser.uid}/createEvent`}>
                Create new event
              </Links>
              {"."}
            </Typography>
          )}
          <Divider
            sx={{ marginTop: 3, marginBottom: 3, borderColor: "red" }}
          />
          <Typography marginTop={3} variant="h5">
            Events I'm attending:
          </Typography>

          {eventsUserIsGoingToLength ? (
            <EventPreviewList events={eventsUserIsGoingTo} />
          ) : (
            <Typography>
              No events found. Check upcoming{" "}
              <Links component={Link} to="/events">
                events
              </Links>{" "}
              to find one that you like.
            </Typography>
          )}
        </Box>
      </Fade>
    );
  }

  return (
    <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
      <Box
        margin={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Links
          component={Link}
          to="/login"
          variant="text"
          sx={{
            textTransform: "none",
            fontSize: "1.02rem",
          }}
        >
          Login
        </Links>
        &nbsp;to see your events
      </Box>
    </Fade>
  );
}
