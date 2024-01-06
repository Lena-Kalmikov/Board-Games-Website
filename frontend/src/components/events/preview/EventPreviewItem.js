import { Link } from "react-router-dom";
import moment from "moment";
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
      <CardMedia sx={{ height: 190, width: 450 }} image={props.image} />
      <CardContent>
        <Typography color="text.secondary">
          {moment(props.date).format("DD/MM/YYYY")} at{" "}
          {moment(props.time, "HH:mm").format("HH:mm")}
        </Typography>
        <Typography fontSize={22} fontWeight={550}>
          {props.title}
        </Typography>
        <Typography color="text.secondary">
          {props.city}, {props.address}
        </Typography>
        <Button
          fullWidth
          variant="outlined"
          sx={{ marginTop: 2, textTransform: "none" }}
          component={Link}
          to={`/events/${props.id}`}
        >
          Explore event
        </Button>
      </CardContent>
    </Card>
  );
}
