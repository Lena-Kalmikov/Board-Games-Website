import React from "react";
import EventItem from "./EventItem";

import { Stack } from "@mui/material";

export default function EventList(props) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        flexWrap: "wrap",
        margin: 3,
        justifyContent: "center",
      }}
    >
      {props.events.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          minAgeLimit={event.minAgeLimit}
          minParticipantsLimit={event.minParticipantsLimit}
          maxParticipantsLimit={event.maxParticipantsLimit}
          description={event.description}
          image={event.image}
          date={event.date}
          time={event.time}
          city={event.city}
          address={event.address}
          game={event.gameId}
        />
      ))}
    </Stack>
  );
}
