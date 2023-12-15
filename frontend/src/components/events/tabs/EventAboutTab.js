import { useState } from "react";

import EventGameDialog from "../dialogs/EventGameDialog";
import EventParticipantsDialog from "../dialogs/EventParticipantsDialog";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";

import { Link } from "@mui/material";

export default function EventAboutTab({ event, users, games }) {
  const [isParticipantDialogOpen, setParticipantDialogOpen] = useState(false);
  const [isGameDialogOpen, setIsGameDialogOpen] = useState(false);

  const handleParticipantDialogOpen = () => {
    setParticipantDialogOpen(true);
  };

  const handleParticipantDialogClose = () => {
    setParticipantDialogOpen(false);
  };

  const handleGameDialogOpen = () => {
    setIsGameDialogOpen(true);
  };

  const handleGameDialogClose = () => {
    setIsGameDialogOpen(false);
  };

  const eventParticipants = event.participants.map((participantId) => {
    const participant = users.find((user) => user.id === participantId);
    return {
      firstName: participant
        ? participant.firstName
        : `Unknown User (${participantId})`,
      lastName: participant
        ? participant.lastName
        : `Unknown User (${participantId})`,
      profilePicture: participant ? participant.profilePicture : null,
    };
  });

  const eventGames = event.games.map((gameId) => {
    const eventGame = games.find((game) => game.id === gameId);
    return { title: eventGame ? eventGame.title : `Unknown Game (${gameId})` };
  });

  const eventCreator = users.find((user) => user.id === event.creator);

  const creatorName = {
    firstName: eventCreator
      ? eventCreator.firstName
      : `Unknown User (${eventCreator.firstName})`,
    lastName: eventCreator
      ? eventCreator.lastName
      : `Unknown User (${eventCreator.firstName})`,
  };

  const avatarWidth = 45;
  const avatarHeight = 45;

  return (
    <Box>
      <Typography gutterBottom fontSize={26}>
        {event.title}
      </Typography>
      <Typography fontSize={15} marginBottom={2}>
        {event.description}
      </Typography>
      <Typography>
        Event by: {creatorName.firstName} {creatorName.lastName}
      </Typography>
      <Typography sx={{ display: "flex" }}>
        Games:&nbsp;
        {eventGames.map((game, index) => (
          <Link marginRight={1} key={index} onClick={handleGameDialogOpen}>
            {game.title}
          </Link>
        ))}
      </Typography>
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
          <AvatarGroup max={5} onClick={handleParticipantDialogOpen}>
            {eventParticipants.map(
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
      <EventParticipantsDialog
        isOpen={isParticipantDialogOpen}
        onClose={handleParticipantDialogClose}
        participants={eventParticipants}
        avatarHeight={avatarHeight}
        avatarWidth={avatarWidth}
      />
      <EventGameDialog
        isOpen={isGameDialogOpen}
        onClose={handleGameDialogClose}
        
      />
    </Box>
  );
}
