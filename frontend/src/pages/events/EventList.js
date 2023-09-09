// import React from "react";
// import GameItem from "./GameItem";
// import { Stack } from "@mui/material";

// const EVENTS = [
//   {
//     id: "e1",
//     date: "2023-8-31",
//     time: "19:00",
//     title: "Let's play 'Exploding Kittens'",
//     city: "Jerusalem",
//     address: "Moshe Dayan st 21, apt 3",
//     description: "An evening dedicated to the best game in the world",
//     participants: 3,
//     gameId: "g1"
//   },
// ];

// export default function EventList(props) {
//   return (
//     <Stack
//       direction={{ xs: "column", sm: "row" }}
//       sx={{
//         flexWrap: "wrap",
//       }}
//     >
//       {props.games.map((game) => (
//         <GameItem
//           key={game.id}
//           id={game.id}
//           title={game.title}
//           minAgeLimit={game.minAgeLimit}
//           minParticipantsLimit={game.minParticipantsLimit}
//           maxParticipantsLimit={game.maxParticipantsLimit}
//           description={game.description}
//           image={game.image}
//         />
//       ))}
//     </Stack>
//   );
// }

