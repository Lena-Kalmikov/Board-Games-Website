import Box from "@mui/material/Box";
import EventPreviewList from "../components/events/preview/EventPreviewList";

export default function Events({ events }) {
  return (
    <Box sx={{ margin: { xs: 0, sm: 7 } }}>
      <EventPreviewList events={events} />
    </Box>
  );
}
