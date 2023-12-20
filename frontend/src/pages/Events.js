import EventPreviewItem from "../components/events/EventPreviewItem"; 

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function Events({ events }) {
  return (
    <Box sx={{ margin: { xs: 0, sm: 7 } }}>
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
    </Box>
  );
}
