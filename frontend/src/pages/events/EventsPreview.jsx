import useFadeInEffect from "../../hooks/useFadeInEffect";
import EventPreviewList from "../../components/events/preview/EventList";
import EventPreviewLoadingSkeleton from "../../components/UI/skeletons/EventPreviewLoadingSkeleton";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { Typography } from "@mui/material";
import { skeletonNumber } from "../../utils/globalVariables";

export default function EventsPreview({ events, isEventsLoading }) {
  const isComponentLoaded = useFadeInEffect();




  if (!isEventsLoading && events.length === 0) {
    return (
      <Box
        sx={{
          margin: { xs: 1, sm: 7 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ marginTop: 5 }}>
          Events currently unavailable.
        </Typography>
      </Box>
    );
  }

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
            <Typography m={1} mt={5}>
              Past Events:
            </Typography>
            <EventPreviewList events={pastEvents} justifyContent={"center"} />
          </Box>
        )}
      </Box>
    </Fade>
  );
}
