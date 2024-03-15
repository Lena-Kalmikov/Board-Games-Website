import Events from "../events/preview/PreviewEvents";
import { filterFutureEvents } from "../../utils/eventsUtils";
import Box from "@mui/material/Box";

export default function EventsSample({ events, isEventsLoading }) {
  const numWantedEvents = 4;
  const futureEvents = filterFutureEvents(events);
  const topFutureEvents = futureEvents?.slice(0, numWantedEvents);

  return (
    <Box marginBottom={10}>
      <Events events={topFutureEvents} isEventsLoading={isEventsLoading} />
    </Box>
  );
}
