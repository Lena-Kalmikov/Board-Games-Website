import Stack from "@mui/material/Stack";
import EventPreviewItem from "./EventPreviewItem";

export default function EventPreviewList({events}) {
  return (
    <Stack
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {events.map((event) => (
        <EventPreviewItem
          key={event.id}
          id={event.id}
          title={event.title}
          image={event.image}
          date={event.date}
          time={event.time}
          city={event.city}
          address={event.address}
        />
      ))}
    </Stack>
  );
}
