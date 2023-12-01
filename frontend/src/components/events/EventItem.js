import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";

export default function EventItem(props) {
  return (
    <Card
      sx={{
        maxWidth: 350,
        margin: 1,
        position: "relative",
        backgroundColor: "#FCFDFF",
      }}
    >
      <CardMedia sx={{ height: 220 }} image={props.image} />
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
            {props.date} at {props.time}
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
            {props.city}, {props.address}
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
          {props.title}
        </Typography>
        <Typography>Game: {props.game}</Typography>
        <Typography>Age limit: 10+ </Typography>
        <Typography>Participants: 3-5</Typography>
        <Typography gutterBottom>Event by: {props.creator}</Typography>
        <Typography variant="body3" color="text.primary">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
