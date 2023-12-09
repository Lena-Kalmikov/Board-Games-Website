import * as React from "react";

import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";
import CardContent from "@mui/material/CardContent";

export default function EventItem(props) {
  const { id } = useParams();

  // Find the event with the matching ID
  const event = props.events.find((event) => event.id === id);

  // Return a loading message or handle the case where the event is not found
  if (!event) {
    return <div>Event was not found</div>;
  }

  // Render the event details
  return (
    <Card
      sx={{
        maxWidth: 350,
        margin: 1,
        position: "relative",
        backgroundColor: "#FCFDFF",
      }}
    >
      <CardMedia sx={{ height: 220 }} image={event.image} />
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", justify: "center" }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              margin: 1,
            }}
          >
            <EventIcon />
          </Avatar>
          <Typography gutterBottom margin={1}>
            {event.date} at {event.time}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justify: "center" }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              margin: 1,
            }}
          >
            <PlaceIcon />
          </Avatar>
          <Typography gutterBottom margin={1}>
            {event.city}, {event.address}
          </Typography>
        </Box>
        <Divider sx={{ marginTop: 1.5 }} />
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          marginTop={2}
          marginBottom={1}
        >
          {event.title}
        </Typography>
        <Typography>Game: {event.game}</Typography>
        <Typography>Age limit: {event.minAgeLimit}+</Typography>
        <Typography>
          Participants: {event.minParticipantsLimit}-
          {event.maxParticipantsLimit}
        </Typography>
        <Typography gutterBottom>Event by: {event.creator}</Typography>
        <Typography variant="body3" color="text.primary">
          {event.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
