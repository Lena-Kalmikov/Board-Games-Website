import React, { useState } from "react";
import EventGameDialog from "../dialogs/EventGameDialog";
import EventParticipantsDialog from "../dialogs/EventParticipantsDialog";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";

const EventAboutTab = React.memo(({ event, users, games }) => {
  const [gameInDialog, setGameInDialog] = useState(null);
  const [isGameDialogOpen, setIsGameDialogOpen] = useState(false);
  const [isParticipantDialogOpen, setParticipantDialogOpen] = useState(false);

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

  // comparing eventParticipants ids to the ids in users array and getting their info from it
  const eventParticipants = event?.participants?.map((participantId) => {
    const participant = users?.find((user) => user.id === participantId);
    return participant;
  });

  // comparing eventGames ids to the ids in games array and getting their info from it
  const eventGames = event?.games?.map((gameId) => {
    const eventGame = games?.find((game) => game.id === gameId);
    return eventGame;
  });

  // comparing eventCreator id and getting their info from the users array
  const eventCreator = users?.find((user) => user.id === event.creator);

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
        Event by: {eventCreator.firstName} {eventCreator.lastName}
      </Typography>
      <Typography sx={{ display: "flex", flexWrap: "wrap" }}>
        Games:&nbsp;
        {eventGames?.map((game) => (
          <Link
            color="secondary"
            style={{ cursor: "pointer" }}
            key={game.id}
            onClick={() => handleGameLinkClick(game)}
            marginRight={1}
          >
            {game.title},
          </Link>
        ))}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          marginTop: 1,
          marginBottom: 2,
        }}
      >
        <Typography marginRight={1}>Participants:</Typography>
        <Tooltip title="See participants">
          <AvatarGroup max={5} onClick={handleParticipantDialogOpen}>
            {eventParticipants?.map((participant) => (
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
      {eventParticipants && (
        <EventParticipantsDialog
          isOpen={isParticipantDialogOpen}
          onClose={handleParticipantDialogClose}
          participants={eventParticipants}
          avatarHeight={avatarHeight}
          avatarWidth={avatarWidth}
        />
      )}
      {gameInDialog && (
        <EventGameDialog
          isOpen={isGameDialogOpen}
          onClose={handleGameDialogClose}
          game={gameInDialog}
        />
      )}
    </Box>
  );
});

export default EventAboutTab;
