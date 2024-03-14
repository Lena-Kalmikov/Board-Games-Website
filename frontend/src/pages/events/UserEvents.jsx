import { useAuth } from "../../utils/firebase";
import { Link, useParams } from "react-router-dom";

import Login from "../Login";
import useFadeInEffect from "../../hooks/useFadeInEffect";
import EventPreviewList from "../../components/events/preview/EventList";
import UserEventsLoadingSkeleton from "../../components/UI/skeletons/UserEventsLoadingSkeleton";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import MuiLink from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function UserEvents({ events, users, isEventsLoading }) {
  const currentUser = useAuth();
  const { userId } = useParams();
  const isComponentLoaded = useFadeInEffect();

  const getUserInfo = (userId, users) => {
    for (let user of users) {
      if (user.id === userId) {
        return `${user.firstName} ${user.lastName}`;
      }
    }
    return "User not found";
  };

  const userName = getUserInfo(userId, users);

  if (isEventsLoading) {
    return <UserEventsLoadingSkeleton />;
  }

  if (!currentUser) {
    return <Login />;
  }

  const eventsCreatedByUser = events.filter(
    (event) => event.creator === userId
  );

  const eventsUserIsGoingTo = events.filter((event) =>
    event?.participants?.includes(userId)
  );

  const futureEvents = eventsUserIsGoingTo.filter((event) => {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    return eventDate > currentDate;
  });

  const pastEvents = eventsUserIsGoingTo.filter((event) => {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    return eventDate < currentDate;
  });

  return (
    <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
      <Box margin={5}>
        <Divider textAlign="left" sx={{ width: "100%" }}>
          Events created by {currentUser.uid === userId ? "me" : userName}
        </Divider>
        {eventsCreatedByUser.length > 0 ? (
          <EventPreviewList
            events={eventsCreatedByUser}
            justifyContent={"flex-start"}
          />
        ) : (
          userId === currentUser.uid && (
            <Typography marginTop={3}>
              No events found.{" "}
              <MuiLink component={Link} to={`/${currentUser.uid}/createEvent`}>
                Create new event
              </MuiLink>
              {"."}
            </Typography>
          )
        )}
        <Divider textAlign="left" sx={{ width: "100%", marginTop: 4 }}>
          Events {currentUser.uid === userId ? "I'm" : `${userName} is`}{" "}
          attending
        </Divider>
        {futureEvents.length > 0 ? (
          <EventPreviewList
            events={futureEvents}
            justifyContent={"flex-start"}
          />
        ) : (
          userId === currentUser.uid && (
            <Typography marginTop={3}>
              No events found. Check upcoming{" "}
              <MuiLink component={Link} to="/events">
                events
              </MuiLink>{" "}
              to find one that you like.
            </Typography>
          )
        )}
        {pastEvents.length > 0 && (
          <>
            <Divider textAlign="left" sx={{ width: "100%", marginTop: 4 }}>
              {currentUser.uid === userId ? "My" : `${userName}'s`} past events
            </Divider>
            <EventPreviewList
              events={pastEvents}
              justifyContent={"flex-start"}
            />
          </>
        )}
      </Box>
    </Fade>
  );
}
