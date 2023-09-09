import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";

export default function EventItem(props) {
  return (
    <Card
      sx={{
        maxWidth: 350,
        margin: 1,
        position: "relative",
      }}
    >
      <CardMedia sx={{ height: 220 }} image={props.image} />
      <CardContent>
        <Box
          sx={{
            borderBottom: "2px solid rgba(82,30,164,0.08)",
            marginTop: -1,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", justify: "center" }}
          >
            <Avatar
              sx={{
                bgcolor: "secondary.main",
                margin: 1,
              }}
            >
              <EventIcon />
            </Avatar>
            <Typography gutterBottom margin={1}>
              {props.date} at {props.time}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", justify: "center" }}
          >
            <Avatar
              sx={{
                bgcolor: "secondary.main",
                margin: 1,
              }}
            >
              <PlaceIcon />
            </Avatar>
            <Typography gutterBottom margin={1}>
              {props.city}, {props.address}
            </Typography>
          </Box>
        </Box>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          marginTop={2}
          marginBottom={2}
        >
          {props.title}
        </Typography>
        <Typography gutterBottom marginTop={1}>
          Game: {props.game}
        </Typography>
        <Typography gutterBottom>Age limit: {props.minAgeLimit}10+ </Typography>
        <Typography gutterBottom>Participants: 3-5</Typography>
        <Typography variant="body3" color="text.primary">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
