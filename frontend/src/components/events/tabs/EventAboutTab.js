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
  const [gameInDialog, setGameInDialog] = useState(null);

  const handleGameLinkClick = (game) => {
    setGameInDialog(game);
    setIsGameDialogOpen(true);
  };

  const handleGameDialogClose = () => {
    setIsGameDialogOpen(false);
  };

  const handleParticipantDialogOpen = () => {
    setParticipantDialogOpen(true);
  };

  const handleParticipantDialogClose = () => {
    setParticipantDialogOpen(false);
  };

  const eventParticipants = event.participants.map((participantId) => {
    const participant = users.find((user) => user.id === participantId);
    return {
      id: participant.id,
      firstName: participant.firstName,
      lastName: participant.lastName,
      profilePicture: participant.profilePicture,
    };
  });

  const eventGames = event.games.map((gameId) => {
    const eventGame = games.find((game) => game.id === gameId);
    return {
      id: eventGame.id,
      title: eventGame.title,
      description: eventGame.description,
      genre: eventGame.genre,
      image: eventGame.image,
      minAgeLimit: eventGame.minAgeLimit,
      minParticipantsLimit: eventGame.minParticipantsLimit,
      maxParticipantsLimit: eventGame.maxParticipantsLimit,
    };
  });

  const eventCreator = users.find((user) => user.id === event.creator);

  const creatorName = {
    firstName: eventCreator.firstName,
    lastName: eventCreator.lastName,
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
        {eventGames.map((game) => (
          <Link
            style={{ cursor: "pointer" }}
            key={game.id}
            onClick={() => handleGameLinkClick(game)}
            marginRight={1}
          >
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
            {eventParticipants.map((participant) => (
              <Avatar
                key={participant.id}
                src={participant.profilePicture}
                alt={participant.firstName}
                sx={{ width: avatarWidth, height: avatarHeight }}
              />
            ))}
          </AvatarGroup>
        </Tooltip>
      </Box>
      {eventParticipants && <EventParticipantsDialog
        isOpen={isParticipantDialogOpen}
        onClose={handleParticipantDialogClose}
        participants={eventParticipants}
        avatarHeight={avatarHeight}
        avatarWidth={avatarWidth}
      />}
      {gameInDialog && (
        <EventGameDialog
          isOpen={isGameDialogOpen}
          onClose={handleGameDialogClose}
          game={gameInDialog}
        />
      )}
    </Box>
  );
}
