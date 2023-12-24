import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

export default function EventPreviewItem(props) {
  return (
    <Card
      sx={{
        maxWidth: 310,
        margin: 1.5,
        backgroundColor: "#FCFDFF",
        borderRadius: 2,
      }}
    >
      <CardMedia sx={{ height: 190 }} image={props.image} />
      <CardContent>
        <Typography color="text.secondary">
          {props.date} at {props.time}
        </Typography>
        <Typography fontSize={22} fontWeight={550}>
          {props.title}
        </Typography>
        <Typography color="text.secondary">
          {props.city}, {props.address}
        </Typography>
        <Link to={`/events/${props.id}`} style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="outlined"
            sx={{ marginTop: 2, textTransform: "none" }}
          >
            Explore event
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
