import React from "react";

import EventItem from "../components/events/EventItem";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function Event(props) {
  return (
    <Box sx={{ m: 2 }}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <EventItem
          events={props.events}
          users={props.users}
          games={props.games}
        />
      </Stack>
    </Box>
  );
}
