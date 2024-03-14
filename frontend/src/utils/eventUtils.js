export function filterFutureEvents(events) {
  const currentDate = new Date();
  return events.filter((event) => new Date(event.date) > currentDate);
}

export function filterPastEvents(events) {
  const currentDate = new Date();
  return events.filter((event) => new Date(event.date) < currentDate);
}
