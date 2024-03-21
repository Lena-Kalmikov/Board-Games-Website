import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";

export default function GameItem(props) {
  return (
    <Card
      sx={{
        margin: 1,
        maxWidth: 350,
        backgroundColor: "paper",
      }}
    >
      <CardMedia sx={{ height: 150 }} image={props.image} />
      <CardContent>
        <Typography fontSize={24}>{props.title}</Typography>
        <Rating
          name="size-large"
          defaultValue={props.rating}
          size="large"
          precision={0.5}
          sx={{ color: "secondary.main" }}
        />
        <Typography>Age limit: {props.minAgeLimit}+ </Typography>
        <Typography>
          Participants: {props.minParticipantsLimit}-
          {props.maxParticipantsLimit}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
