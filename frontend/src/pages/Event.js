import React, { useEffect, useState } from "react";
import { useAuth } from "../firebase";
import db from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import useFadeInEffect from "../hooks/useFadeInEffect";
import { useNavigate, useParams } from "react-router-dom";
import EventAboutTab from "../components/events/tabs/EventAboutTab";
import EventDiscussionTab from "../components/events/tabs/EventDiscussionTab";
import EventLoadingSkeleton from "../components/UI/skeletons/EventLoadingSkeleton";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";
import CardContent from "@mui/material/CardContent";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

export default function Event({
  events,
  users,
  games,
  discussionBoards,
  onUpdateEvent,
  onSendMessage,
}) {
  const currentUser = useAuth();
  const { eventId } = useParams();
  const navigate = useNavigate();
  const isLoaded = useFadeInEffect();
  const [event, setEvent] = useState(null);

  const [isLoggedUserParticipantInEvent, setIsLoggedUserParticipantInEvent] =
    useState(false);

  useEffect(() => {
    // Find the specific event using the eventId
    const currentEvent = events?.find((event) => event.id === eventId);

    if (currentEvent) {
      setEvent(currentEvent);
      if (currentUser) {
        setIsLoggedUserParticipantInEvent(
          currentEvent.participants?.includes(currentUser.uid) || false
        );
      }
    }
  }, [eventId, events, currentUser, navigate]);

  const [activeTab, setActiveTab] = useState("about");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // const handleGoingToEvent = () => {
  //   if (!currentUser) {
  //     navigate("/login");
  //     return;
  //   }

  //   // change this to update firebase event participants add/remove
  //   const updatedParticipants = isLoggedUserParticipantInEvent
  //     ? event.participants.filter(
  //         (participantId) => participantId !== currentUser.uid
  //       )
  //     : [...event.participants, currentUser.uid];

  //   setIsLoggedUserParticipantInEvent(!isLoggedUserParticipantInEvent);

  //   const updatedEvent = { ...event, participants: updatedParticipants };

  //   onUpdateEvent(updatedEvent);
  // };

const handleGoingToEvent = async () => {
  if (!currentUser) {
    navigate("/login");
    return;
  }

  const updatedParticipants = isLoggedUserParticipantInEvent
    ? event.participants.filter(
        (participantId) => participantId !== currentUser.uid
      )
    : [...event.participants, currentUser.uid];

  setIsLoggedUserParticipantInEvent(!isLoggedUserParticipantInEvent);

  const eventRef = doc(db, "events", event.id);
  await updateDoc(eventRef, {
    participants: updatedParticipants,
  });
};

  return (
    <Fade in={isLoaded} timeout={{ enter: 500 }}>
      <Box
        sx={{
          margin: { xs: 0, sm: 7 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        {event ? (
          <Card
            sx={{
              backgroundColor: "#FCFDFF",
            }}
          >
            <CardMedia
              sx={{ height: { xs: 150, sm: 210 } }}
              image={event.image}
            />
            <CardContent sx={{ maxWidth: 600 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 1,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                  }}
                >
                  <EventIcon />
                </Avatar>
                <Typography marginLeft={1}>
                  {event.date} at {event.time}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                  }}
                >
                  <PlaceIcon />
                </Avatar>
                <Typography marginLeft={1}>
                  {event.city}, {event.address}
                </Typography>
              </Box>
              <Divider sx={{ marginTop: 1.5 }} />
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                }}
              >
                <Button
                  onClick={() => handleTabClick("about")}
                  sx={{
                    borderBottom:
                      activeTab === "about" ? "2px solid #92beef" : "none",
                    borderRadius: "0",
                  }}
                >
                  About
                </Button>
                <Button
                  onClick={() => handleTabClick("discussion")}
                  sx={{
                    borderBottom:
                      activeTab === "discussion" ? "2px solid #92beef" : "none",
                    borderRadius: "0",
                  }}
                >
                  Discussion
                </Button>
                <Button
                  color="secondary"
                  onClick={handleGoingToEvent}
                  sx={{
                    textTransform: "none",
                    margin: 1,
                    borderRadius: 5,
                    marginLeft: "auto",
                    alignSelf: "flex-end",
                  }}
                  variant={
                    isLoggedUserParticipantInEvent ? "contained" : "outlined"
                  }
                  startIcon={
                    isLoggedUserParticipantInEvent && (
                      <CheckCircleOutlineOutlinedIcon />
                    )
                  }
                >
                  {isLoggedUserParticipantInEvent ? "Going" : "Join event"}
                </Button>
              </Box>
              <Box margin={1} marginTop={3} sx={{ width: { sm: 550 } }}>
                <Box
                  style={{ display: activeTab === "about" ? "block" : "none" }}
                >
                  <EventAboutTab event={event} users={users} games={games} />
                </Box>
                <Box
                  style={{
                    display: activeTab === "discussion" ? "block" : "none",
                  }}
                >
                  <EventDiscussionTab
                    users={users}
                    discussionBoards={discussionBoards}
                    eventId={eventId}
                    onSendMessage={onSendMessage}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ) : (
          <EventLoadingSkeleton />
        )}
      </Box>
    </Fade>
  );
}
