import React from "react";

import EventItem from "./EventItemPreview";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function EventPreviewList(props) {
  return (
    <Box sx={{ m: 8 }}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {props.events.map((event) => (
          <EventItem
            key={event.id}
            id={event.id}
            title={event.title}
            image={event.image}
            date={event.date}
            time={event.time}
            city={event.city}
            address={event.address}
          />
        ))}{" "}
      </Stack>
    </Box>
  );
}
