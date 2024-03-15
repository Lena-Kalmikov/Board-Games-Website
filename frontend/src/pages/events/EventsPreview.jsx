import EventPreviewList from "../../components/events/preview/EventPreviewList";
import EventPreviewLoadingSkeleton from "../../components/UI/skeletons/EventPreviewLoadingSkeleton";
import useFadeInEffect from "../../hooks/useFadeInEffect";
import { skeletonNumber } from "../../utils/globalVariables";
import { filterFutureEvents, filterPastEvents } from "../../utils/eventsUtils";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function EventsPreview({ events, isEventsLoading }) {
  const isComponentLoaded = useFadeInEffect();
  const pastEvents = filterPastEvents(events);
  const futureEvents = filterFutureEvents(events);

  if (isEventsLoading) {
    return (
      <Box
        sx={{
          margin: { xs: 1, sm: 7 },
          display: "flex",
          flexWrap: { xs: "wrap" },
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {Array(skeletonNumber)
          .fill()
          .map((item, index) => (
            <EventPreviewLoadingSkeleton key={index} {...item} />
          ))}
      </Box>
    );
  }

  if (!isEventsLoading && events.length === 0) {
    return (
      <Box
        sx={{
          margin: { xs: 1, sm: 7 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography mt={5}>Events currently unavailable.</Typography>
      </Box>
    );
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
          Upcoming Events
        </Divider>
        <EventPreviewList events={futureEvents} />
        <Divider textAlign="left" sx={{ width: "100%", marginTop: 4 }}>
          Past Events
        </Divider>
        <EventPreviewList events={pastEvents} />
      </Box>
    </Fade>
  );
}
