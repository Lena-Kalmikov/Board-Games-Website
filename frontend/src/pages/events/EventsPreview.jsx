import EventPreviewList from "../../components/events/preview/EventList";
import EventPreviewLoadingSkeleton from "../../components/UI/skeletons/EventPreviewLoadingSkeleton";
import useFadeInEffect from "../../hooks/useFadeInEffect";
import { skeletonNumber } from "../../utils/globalVariables";
import { filterFutureEvents, filterPastEvents } from "../../utils/eventUtils";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

export default function EventsPreview({ events, isEventsLoading }) {
  const isComponentLoaded = useFadeInEffect();
  const futureEvents = filterFutureEvents(events);
  const pastEvents = filterPastEvents(events);

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
        marginBottom={4}
        sx={{
          margin: { xs: 0, sm: 10 },
        }}
      >
        <EventPreviewList events={futureEvents} justifyContent={"center"} />
        <Typography m={1} mt={5} sx={{ textAlign: "center" }}>
          Past Events:
        </Typography>
        <EventPreviewList events={pastEvents} justifyContent={"center"} />
      </Box>
    </Fade>
  );
}
