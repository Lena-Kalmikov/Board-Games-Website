import EventPreviewItem from "./EventPreviewItem";
import Stack from "@mui/material/Stack";

export default function EventPreviewList({ events, justifyContent }) {
  const defaultJustifyContent = { xs: "center", lg: "flex-start" };

  return (
    <Stack
      sx={{
        display: "flex",
        flexWrap: { xs: "wrap" },
        flexDirection: "row",
        justifyContent: justifyContent || defaultJustifyContent,
      }}
    >
      {events?.map((event) => (
        <EventPreviewItem
          key={event.id}
          id={event.id}
          date={event.date}
          time={event.time}
          city={event.city}
          title={event.title}
          image={event.image}
          creator={event.creator}
          address={event.address}
        />
      ))}
    </Stack>
  );
}
