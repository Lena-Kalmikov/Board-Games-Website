import { useState } from "react";

import styled from "@mui/system/styled";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import AvatarGroup from "@mui/material/AvatarGroup";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import CloseIcon from "@mui/icons-material/Close";

export default function EventAboutTab({ event, users }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Map participants to user names
  const participants = event.participants.map((participantId) => {
    // Find the corresponding user for the current participant ID
    const user = users.find((user) => user.id === participantId);
    // Return the user's name if found, or a placeholder if not
    return {
      firstName: user ? user.firstName : `Unknown User (${participantId})`,
      lastName: user ? user.lastName : `Unknown User (${participantId})`,
      profilePicture: user ? user.profilePicture : null,
    };
  });

  // Access the creator string directly from the event
  const eventCreator = event.creator;

  // Find the corresponding user for the event creator ID
  const creatorUser = users.find((user) => user.id === eventCreator);

  // Get the creator's first name if found, or use a placeholder if not
  const creator = creatorUser
    ? creatorUser.firstName
    : `Unknown User (${eventCreator})`;

  const DialogDiv = styled("div")({
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
    transition: "backgroundColor 0.3s",
    "&:hover": {
      backgroundColor: "#eee",
    },
  });

  const avatarWidth = 45;
  const avatarHeight = 45;

  return (
    <Box>
      <Typography gutterBottom fontSize={26}>
        {event.title}
      </Typography>
      <Typography fontSize={15} marginBottom={1.5}>
        {event.description}
      </Typography>
      <Typography>Games: {event.games}</Typography>
      <Typography>Event by: {creator}</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          marginTop: 1,
        }}
      >
        <Typography marginRight={1}>Participants:</Typography>
        <Tooltip title="See participants">
          <AvatarGroup max={5} onClick={handleModalOpen}>
            {participants.map(
              (participant, index) =>
                participant.profilePicture && (
                  <Avatar
                    key={index}
                    src={participant.profilePicture}
                    alt={participant.firstName}
                    sx={{ width: avatarWidth, height: avatarHeight }}
                  />
                )
            )}
          </AvatarGroup>
        </Tooltip>
      </Box>
      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: "1.5rem", textAlign: "center" }}>
          Participants
        </DialogTitle>
        <DialogContent>
          {participants.map((participant, index) => (
            <DialogDiv key={index}>
              <Avatar
                alt={participant.firstName}
                src={participant.profilePicture}
                sx={{
                  width: avatarWidth,
                  height: avatarHeight,
                  marginRight: 2,
                }}
              />
              <Typography>{`${participant.firstName} ${participant.lastName}`}</Typography>
            </DialogDiv>
          ))}
        </DialogContent>
        <DialogActions sx={{ position: "absolute", top: 0, right: 0 }}>
          <IconButton>
            <CloseIcon onClick={handleModalClose} />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
