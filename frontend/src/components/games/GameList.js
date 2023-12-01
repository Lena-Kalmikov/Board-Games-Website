import React from "react";
import GameItem from "./GameItem";

export default function GameList(props) {
  return (
    <>
      {props.games.map((game) => (
        <GameItem
          key={game.id}
          id={game.id}
          title={game.title}
          genre={game.genre}
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
