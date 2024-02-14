import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

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
        <Typography gutterBottom fontSize={24}>
          {props.title}
        </Typography>
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
