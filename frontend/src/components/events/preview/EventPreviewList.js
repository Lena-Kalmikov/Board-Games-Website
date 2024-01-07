import EventPreviewItem from "./EventPreviewItem";

import Stack from "@mui/material/Stack";

export default function EventPreviewList({ events, justifyContent }) {
  return (
    <Stack
      sx={{
        display: "flex",
        flexWrap: { xs: "wrap" },
        flexDirection: "row",
        justifyContent: {justifyContent},
        backgroundColor: "lightgreen",
      }}
    >
      {events ? (
        events.map((event) => (
          <EventPreviewItem
            key={event.id}
            id={event.id}
            title={event.title}
            image={event.image}
            date={event.date}
            time={event.time}
            city={event.city}
            creator={event.creator}
            address={event.address}
          />
        ))
      ) : (
        <div>No events</div>
      )}
    </Stack>
  );
}
