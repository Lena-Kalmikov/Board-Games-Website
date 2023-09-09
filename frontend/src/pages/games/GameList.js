import React from "react";
import GameItem from "./GameItem";

import { Stack } from "@mui/material";

export default function GameList(props) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        flexWrap: "wrap",
        margin: 3,
        justifyContent: "center",
      }}
    >
      {props.games.map((game) => (
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
    </Stack>
  );
}
