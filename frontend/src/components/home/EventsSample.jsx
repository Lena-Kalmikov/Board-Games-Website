
import Events from "../events/preview/Events";
import { filterFutureEvents } from "../../utils/eventUtils";

export default function EventsSample({ events, isEventsLoading }) {
  const numWantedEvents = 4;
  const futureEvents = filterFutureEvents(events);
  const topFutureEvents = futureEvents?.slice(0, numWantedEvents);

  return <Events events={topFutureEvents} isEventsLoading={isEventsLoading} />;
}
