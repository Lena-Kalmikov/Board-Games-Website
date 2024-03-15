// comparing eventParticipants ids to the ids in users array and getting their info from it
export function getEventParticipantsFromUsers(event, users) {
  return event?.participants
    ?.map((participantId) => {
      const participant = users.find((user) => user.id === participantId);
      return participant;
    })
    .filter((user) => user !== undefined);
}

// comparing eventGames ids to the ids in games array and getting their info from it
export function getEventGamesFromGames(event, games) {
  return event?.games
    ?.map((gameId) => {
      const game = games.find((game) => game.id === gameId);
      return game;
    })
    .filter((game) => game !== undefined);
}

// comparing eventCreator id and getting their info from the users array
export function getEventCreatorFromUsers(event, users) {
  return users.find((user) => user.id === event.creator);
}
