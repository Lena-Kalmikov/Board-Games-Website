import * as React from "react";
import { useState } from "react";

import "./GameItem.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function GameItem(props) {
  const [isShowMore, setIsShowMore] = useState(true);
  let descriptionCSSClass = "clamp-line-height";

  const toggleReadMore = () => {
    setIsShowMore((show) => !show);
  };

  if (!isShowMore) {
    descriptionCSSClass = "";
  }

  return (
    <Card
      sx={{
        maxWidth: 350,
        margin: 1,
        position: "relative",
        backgroundColor: "#FCFDFF",
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
        <Typography
          variant="body3"
          color="text.secondary"
          // className={descriptionCSSClass}
        >
          {props.description}
        </Typography>
        {/* <Typography
          marginTop={0.3}
          variant="body2"
          color="rgba(17, 82, 147, 0.57)"
          onClick={toggleReadMore}
        >
          {isShowMore ? " show more" : " show less"}
        </Typography> */}
      </CardContent>
    </Card>
  );
}
