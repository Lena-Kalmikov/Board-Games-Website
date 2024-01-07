import React from "react";
import { useAuth } from "../../firebase";
import { Link, useParams } from "react-router-dom";
import useFadeInEffect from "../../hooks/useFadeInEffect";
import EventPreviewList from "../../components/events/preview/EventPreviewList";
import UserEventsLoadingSkeleton from "../../components/UI/skeletons/UserEventsLoadingSkeleton";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Links from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function UserEvents({ events }) {
  const currentUser = useAuth();
  const { userId } = useParams();
  const isComponentLoaded = useFadeInEffect();
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
          sx={{alignItems:{md:"center", lg:"flex-start"} }}
        >
          <Divider fullWidth textAlign="left" sx={{ width: "100%" }}>
            Events created by me
          </Divider>
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
            fullWidth
            textAlign="left"
            sx={{ width: "100%", marginTop: 4 }}
          >
            Events I'm attending
          </Divider>

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
