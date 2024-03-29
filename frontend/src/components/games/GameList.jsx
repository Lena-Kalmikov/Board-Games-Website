import GameItem from "./GameItem";

export default function GameList({ games }) {
  if (!games || games.length === 0) {
    return <div>No games found.</div>;
  }

  return (
    <>
      {games.map((game) => (
        <GameItem
          key={game.id}
          title={game.title}
          image={game.image}
          description={game.description}
          minAgeLimit={game.minAgeLimit}
          minParticipantsLimit={game.minParticipantsLimit}
          maxParticipantsLimit={game.maxParticipantsLimit}
          rating={game.rating}
        />
      ))}
    </>
  );
}
