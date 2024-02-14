import { useAuth } from "../../utils/firebase";
import { Link, useParams } from "react-router-dom";

import Login from "../Login";
import useFadeInEffect from "../../hooks/useFadeInEffect";
import EventPreviewList from "../../components/events/preview/EventPreviewList";
import UserEventsLoadingSkeleton from "../../components/UI/skeletons/UserEventsLoadingSkeleton";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import MuiLink from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function UserEvents({ events, isEventsLoading }) {
  const currentUser = useAuth();
  const { userId } = useParams();
  const isComponentLoaded = useFadeInEffect();

  if (isEventsLoading) {
    return <UserEventsLoadingSkeleton />;
  }

  if (!currentUser) {
    return <Login />;
  }

  if (currentUser?.uid !== userId) {
    return (
      <Typography margin={5} textAlign={"center"}>
        Wrong page, go to{" "}
        <MuiLink component={Link} to={`/${currentUser.uid}/myEvents`}>
          your events
        </MuiLink>
      </Typography>
    );
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
        <Box margin={5}>
          <Divider textAlign="left" sx={{ width: "100%" }}>
            Events created by me
          </Divider>
          {eventsCreatedByUserLength ? (
            <EventPreviewList
              events={eventsCreatedByUser}
              justifyContent={"flex-start"}
            />
          ) : (
            <Typography marginTop={3}>
              No events found.{" "}
              <MuiLink component={Link} to={`/${currentUser.uid}/createEvent`}>
                Create new event
              </MuiLink>
              {"."}
            </Typography>
          )}
          <Divider textAlign="left" sx={{ width: "100%", marginTop: 4 }}>
            Events I'm attending
          </Divider>

          {eventsUserIsGoingToLength ? (
            <EventPreviewList
              events={eventsUserIsGoingTo}
              justifyContent={"flex-start"}
            />
          ) : (
            <Typography marginTop={3}>
              No events found. Check upcoming{" "}
              <MuiLink component={Link} to="/events">
                events
              </MuiLink>{" "}
              to find one that you like.
            </Typography>
          )}
        </Box>
      </Fade>
    );
  }
}