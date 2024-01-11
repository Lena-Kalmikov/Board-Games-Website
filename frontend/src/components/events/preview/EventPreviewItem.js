import React, { useState } from "react";

import { Link } from "react-router-dom";
import db from "../../../utils/firebase";
import { useAuth } from "../../../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import DeleteDialog from "../../UI/DeleteDialog";
import moment from "moment";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function EventPreviewItem(props) {
  const currentUser = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteEvent = async (id) => {
    try {
      const eventRef = doc(db, "events", id);
      await updateDoc(eventRef, {
        isDeleted: true,
      });
    } catch (error) {
      alert("Error deleting event:", error.message);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 280,
        margin: 0.5,
        marginTop: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "paper",
      }}
    >
      <CardMedia sx={{ height: 150, width: 290 }} image={props.image} />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography color="text.secondary">
          {moment(props.date).format("DD/MM/YYYY")} at{" "}
          {moment(props.time, "HH:mm").format("HH:mm")}
        </Typography>
        <Typography fontSize={20} fontWeight={550}>
          {props.title}
        </Typography>
        <Typography color="text.secondary">City: {props.city}</Typography>

        <Box display={"flex"} flexDirection={"row"} marginTop={2}>
          <Button
            fullWidth
            variant="outlined"
            sx={{ textTransform: "none" }}
            component={Link}
            to={`/events/${props.id}`}
          >
            Explore event
          </Button>
          {props.creator === currentUser?.uid && (
            <Tooltip title="Delete event">
              <IconButton
                sx={{
                  marginLeft: 0.5,
                  fontSize: 23,
                  "&:hover": {
                    color: "error.main",
                    backgroundColor: "background.deleteHover",
                  },
                }}
                onClick={() => {
                  setIsDeleteDialogOpen(true);
                }}
              >
                <DeleteOutlinedIcon
                  fontSize="inherit"
                  sx={{
                    color: "error.main",
                  }}
                />
              </IconButton>
            </Tooltip>
          )}
        </Box>
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
