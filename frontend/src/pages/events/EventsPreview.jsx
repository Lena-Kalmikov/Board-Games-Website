import useFadeInEffect from "../../hooks/useFadeInEffect";
import EventPreviewList from "../../components/events/preview/EventPreviewList";
import EventPreviewLoadingSkeleton from "../../components/UI/skeletons/EventPreviewLoadingSkeleton";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { Typography } from "@mui/material";

export default function EventsPreview({ events, isEventsLoading }) {
  const isComponentLoaded = useFadeInEffect();

  const noData = events.length === 0;
  
  const futureEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    return eventDate > currentDate;
  });
  
  const pastEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    return eventDate < currentDate;
  });

  const skeletonNumber = 4;

  return (
    <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
      <Box
        sx={{
          margin: { xs: "0", sm: 10 },
        }}
      >
        {isEventsLoading ? (
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
              .map((item, index) => (
                <EventPreviewLoadingSkeleton key={index} {...item} />
              ))}
          </Box>
        ) : (
          <Box marginBottom={4}>
            <EventPreviewList events={futureEvents} justifyContent={"center"} />
            <Typography m={1} mt={5}>Past Events:</Typography>
            <EventPreviewList events={pastEvents} justifyContent={"center"} />
          </Box>
        )}
        {!isEventsLoading && noData && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            No events found.
          </Box>
        )}
      </Box>
    </Fade>
  );
}
