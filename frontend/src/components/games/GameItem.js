import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function GameItem(props) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 1,
        position: "relative",
      }}
    >
      <CardMedia sx={{ height: 140 }} image={props.image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <Typography>Age limit: {props.minAgeLimit}+ </Typography>
        <Typography>
          Participants: {props.minParticipantsLimit}-
          {props.maxParticipantsLimit}
        </Typography>
      </CardContent>
    </Card>
  );
}
