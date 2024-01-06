import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../firebase";
import db from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import DeleteDialog from "../../UI/DeleteDialog";

export default function EventPreviewItem(props) {
  const currentUser = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteEvent = async (id) => {
    const eventRef = doc(db, "events", id);
    await updateDoc(eventRef, {
      isDeleted: true,
    });
  };

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
        {props.creator === currentUser?.uid && (
          <Button
            fullWidth
            variant="outlined"
            sx={{
              marginTop: 2,
              borderColor: "salmon",
              color: "salmon",
              "&:hover": {
                backgroundColor: "#fff6f3",
                borderColor: "salmon",
              },
            }}
            onClick={() => {
              setIsDeleteDialogOpen(true);
            }}
          >
            Delete Event
          </Button>
        )}
      </CardContent>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={() => {
          handleDeleteEvent(props.id);
          setIsDeleteDialogOpen(false);
        }}
        item="event"
      />
    </Card>
  );
}
