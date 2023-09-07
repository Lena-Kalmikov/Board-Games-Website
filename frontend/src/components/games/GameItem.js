import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function GameItem(props) {
  return (
    <Card
      sx={{
        maxWidth: 350,
        margin: 1,
        position: "relative",
      }}
    >
      <CardMedia sx={{ height: 145 }} image={props.image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography>Age limit: {props.minAgeLimit}+ </Typography>
        <Typography gutterBottom>
          Participants: {props.minParticipantsLimit}-
          {props.maxParticipantsLimit}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
