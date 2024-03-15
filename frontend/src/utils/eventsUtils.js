export function filterFutureEvents(events) {
  const currentDate = new Date();
  return events.filter((event) => new Date(event.date) > currentDate);
}

export function filterPastEvents(events) {
  const currentDate = new Date();
  return events.filter((event) => new Date(event.date) < currentDate);
}

export function getUserName(userId, users) {
  const foundUser = users.find((user) => user.id === userId);
  return foundUser
    ? `${foundUser.firstName} ${foundUser.lastName}`
    : "User not found";
}

