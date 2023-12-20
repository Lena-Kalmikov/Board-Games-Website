import GameItem from "./GameItem";

export default function GameList({ games }) {
  return (
    <>
      {games.map((game) => (
        <GameItem
          key={game.id}
          id={game.id}
          title={game.title}
          minAgeLimit={game.minAgeLimit}
          minParticipantsLimit={game.minParticipantsLimit}
          maxParticipantsLimit={game.maxParticipantsLimit}
          description={game.description}
          image={game.image}
        />
      ))}
    </>
  );
}
