import GameItem from "./GameItem";

export default function GameList({ games }) {
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
        />
      ))}
    </>
  );
}
