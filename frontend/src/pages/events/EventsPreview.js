import useFadeInEffect from "../../hooks/useFadeInEffect";
import EventPreviewList from "../../components/events/preview/EventPreviewList";
import EventPreviewLoadingSkeleton from "../../components/UI/skeletons/EventPreviewLoadingSkeleton";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

export default function EventsPreview({ events }) {
  const isComponentLoaded = useFadeInEffect();
  const isLoading = events.length === 0;
  const skeletonNumber = 4;

  return (
    <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
      <Box
        sx={{
          margin: { xs: 0, sm: 7 },
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
          <EventPreviewList events={events} justifyContent={"flex-start"} />
        )}
      </Box>
    </Fade>
  );
}
