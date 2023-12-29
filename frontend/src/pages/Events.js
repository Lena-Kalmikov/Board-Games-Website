import useFadeInEffect from "../hooks/useFadeInEffect";
import EventPreviewList from "../components/events/preview/EventPreviewList";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

export default function Events({ events }) {
  const isLoaded = useFadeInEffect();

  return (
    <Fade in={isLoaded} timeout={{ enter: 500 }}>
      <Box sx={{ margin: { xs: 0, sm: 7 } }}>
        <EventPreviewList events={events} />
      </Box>
    </Fade>
  );
}
