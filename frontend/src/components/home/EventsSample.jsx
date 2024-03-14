import { Link } from "react-router-dom";

import useFadeInEffect from "../../hooks/useFadeInEffect";
import EventPreviewList from "../events/preview/EventList";
import EventPreviewLoadingSkeleton from "../UI/skeletons/EventPreviewLoadingSkeleton";

import Events from "../events/preview/Events";

export default function EventsSample({ events, isEventsLoading }) {
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

  const numWantedEvents = 4;
  const upcomingEvents = events?.slice(0, numWantedEvents);
  console.log("EventsSample are " + upcomingEvents);

  return <Events events={upcomingEvents} isEventsLoading={isEventsLoading} />;
}
