import Login from "../Login";
import { Link, useParams } from "react-router-dom";
import useFadeInEffect from "../../hooks/useFadeInEffect";
import { useAuth } from "../../utils/firebase";
import EventPreviewList from "../../components/events/preview/EventPreviewList";
import UserEventsLoadingSkeleton from "../../components/UI/skeletons/UserEventsLoadingSkeleton";
import {
  filterFutureEvents,
  filterPastEvents,
  getUserName,
} from "../../utils/eventsUtils";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import MuiLink from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function UserEvents({ events, users, isEventsLoading }) {
  const currentUser = useAuth();
  const { userId } = useParams();
  const isComponentLoaded = useFadeInEffect();

  const userName = getUserName(userId, users);

  const eventsCreatedByUser = events.filter(
    (event) => event.creator === userId
  );

  const eventsUserIsGoingTo = events.filter((event) =>
    event?.participants?.includes(userId)
  );

  const pastEvents = filterPastEvents(eventsUserIsGoingTo);
  const futureEvents = filterFutureEvents(eventsUserIsGoingTo);

  if (isEventsLoading) {
    return <UserEventsLoadingSkeleton />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 5,
          marginLeft: { lg: 10 },
          marginRight: { lg: 10 },
        }}
      >
        <Divider textAlign="left" sx={{ width: "100%" }}>
          Events created by {currentUser.uid === userId ? "me" : userName}
        </Divider>{" "}
        {eventsCreatedByUser.length === 0 && userId === currentUser.uid && (
          <Typography marginTop={3}>
            No events found,{" "}
            <MuiLink component={Link} to={`/${currentUser.uid}/createEvent`}>
              Create new event
            </MuiLink>
            {"."}
          </Typography>
        )}
        {eventsCreatedByUser.length > 0 && (
          <EventPreviewList events={eventsCreatedByUser} />
        )}
        <Divider textAlign="left" sx={{ width: "100%", marginTop: 4 }}>
          Events {currentUser.uid === userId ? "I'm" : `${userName} is`}{" "}
          attending
        </Divider>
        {futureEvents.length === 0 && userId === currentUser.uid && (
          <Typography marginTop={3}>
            No events found, check{" "}
            <MuiLink component={Link} to="/events">
              upcoming events
            </MuiLink>{" "}
            to find one that you like.
          </Typography>
        )}
        {futureEvents.length > 0 && <EventPreviewList events={futureEvents} />}
        {pastEvents.length > 0 && (
          <>
            <Divider textAlign="left" sx={{ width: "100%", marginTop: 4 }}>
              Events {currentUser.uid === userId ? "I've" : `${userName} has`}{" "}
              attended in the past{" "}
            </Divider>
            <EventPreviewList events={pastEvents} />
          </>
        )}
      </Box>
    </Fade>
  );
}
