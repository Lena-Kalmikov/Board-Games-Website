import React, { useState } from "react";

import Map from "../../UI/Map";
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
  const [isParticipantDialogOpen, setIsParticipantDialogOpen] = useState(false);

  const handleGameDialogOpen = (game) => {
    setGameInDialog(game);
    setIsGameDialogOpen(true);
  };

  const handleGameDialogClose = () => {
    setIsGameDialogOpen(false);
  };

  const handleParticipantDialogOpen = () => {
    setIsParticipantDialogOpen(true);
  };

  const handleParticipantDialogClose = () => {
    setIsParticipantDialogOpen(false);
  };

  // comparing eventParticipants ids to the ids in users array and getting their info from it
  // const eventParticipants = event?.participants?.map((participantId) => {
  //   const participant = users?.find((user) => user.id === participantId);
  //   return participant;
  // });
  let eventParticipants = [];
  try {
    if (users.length === 0) {
      throw new Error("Users array is empty");
    }
    eventParticipants = event?.participants?.map((participantId) => {
      const participant = users.find((user) => user.id === participantId);
      return participant;
    });
  } catch (error) {
    console.error(
      "An error occurred while fetching event participants:",
      error.message
    );
  }

  // comparing eventGames ids to the ids in games array and getting their info from it
  const eventGames = event?.games?.map((gameId) => {
    const eventGame = games?.find((game) => game.id === gameId);
    return eventGame;
  });

  // comparing eventCreator id and getting their info from the users array
  const eventCreator = users?.find((user) => user.id === event.creator);

  const eventLocation = `${event.city}, ${event.address}`;

  const avatarWidth = 45;
  const avatarHeight = 45;

  return (
    <Box>
      <Typography gutterBottom fontSize={26}>
        {event.title}
      </Typography>
      <Typography color="text.secondary" fontSize={15} marginBottom={2}>
        {event.description}
      </Typography>
      <Box display={"flex"}>
        <Typography>Event by:&nbsp;</Typography>
        <Typography color="text.secondary">
          {!eventCreator && "No creator found"}
          {eventCreator && `${eventCreator.firstName} ${eventCreator.lastName}`}
        </Typography>
      </Box>
      <Typography sx={{ display: "flex", flexWrap: "wrap" }}>
        Games:&nbsp;
        {games.length === 0 && <Box color="text.secondary">No games found</Box>}
        {games.length > 0 &&
          eventGames.map((game) => (
            <Link
              color="secondary"
              style={{ cursor: "pointer" }}
              key={game.id}
              onClick={() => handleGameDialogOpen(game)}
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
          marginBottom: 3,
          marginTop: 1,
        }}
      >
        <Typography marginRight={1}>Participants:</Typography>
        {eventParticipants.length === 0 && (
          <Box color="text.secondary">No users found.</Box>
        )}
        <Tooltip title="See participants">
          <AvatarGroup
            max={5}
            onClick={handleParticipantDialogOpen}
            sx={{
              "& .MuiAvatarGroup-avatar": {
                width: avatarWidth,
                height: avatarHeight,
              },
            }}
          >
            {eventParticipants > 0 &&
              eventParticipants.map((participant) => (
                <Avatar
                  key={participant.id}
                  src={participant.profilePicture}
                  alt={participant.firstName}
                />
              ))}
          </AvatarGroup>
        </Tooltip>
      </Box>
      <Box>
        <Map eventLocation={eventLocation} />
      </Box>
      {eventParticipants > 0 && (
        <EventParticipantsDialog
          avatarWidth={avatarWidth}
          avatarHeight={avatarHeight}
          isOpen={isParticipantDialogOpen}
          participants={eventParticipants}
          onClose={handleParticipantDialogClose}
        />
      )}
      {gameInDialog && (
        <EventGameDialog
          game={gameInDialog}
          isOpen={isGameDialogOpen}
          onClose={handleGameDialogClose}
        />
      )}
    </Box>
  );
});

export default EventAboutTab;
