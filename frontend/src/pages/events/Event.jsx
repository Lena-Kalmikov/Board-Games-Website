import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import db from "../../utils/firebase";
import { useAuth } from "../../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

import useFadeInEffect from "../../hooks/useFadeInEffect";
import EventAboutTab from "../../components/events/tabs/EventAboutTab";
import EventDiscussionTab from "../../components/events/tabs/EventDiscussionTab";
import EventLoadingSkeleton from "../../components/UI/skeletons/EventLoadingSkeleton";

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
  isEventsLoading,
}) {
  const navigate = useNavigate();
  const currentUser = useAuth();
  const { eventId } = useParams();
  const isComponentLoaded = useFadeInEffect();

  const [event, setEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [isEventDataLoading, setIsEventDataLoading] = useState(true);
  const [isLoggedUserParticipantInEvent, setIsLoggedUserParticipantInEvent] =
    useState(false);

  useEffect(() => {
    if (isEventsLoading) {
      setIsEventDataLoading(true);
    } else {
      const currentEvent = events?.find((event) => event.id === eventId);
      if (currentEvent) {
        setEvent(currentEvent);
        if (currentUser) {
          setIsLoggedUserParticipantInEvent(
            currentEvent.participants?.includes(currentUser.uid) || false
          );
        }
      }
      setIsEventDataLoading(false);
    }
  }, [eventId, events, currentUser, navigate, isEventsLoading]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleGoingToEvent = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const currentParticipants = Array.isArray(event.participants)
      ? event.participants
      : [];

    const updatedParticipants = isLoggedUserParticipantInEvent
      ? currentParticipants.filter(
          (participantId) => participantId !== currentUser?.uid
        )
      : [...currentParticipants, currentUser?.uid];

    setIsLoggedUserParticipantInEvent(!isLoggedUserParticipantInEvent);

    const eventRef = doc(db, "events", event.id);
    await updateDoc(eventRef, {
      participants: updatedParticipants,
    });
  };

  if (isEventDataLoading) {
    return (
      <Box
        sx={{
          margin: { xs: 1, sm: 7 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <EventLoadingSkeleton />
      </Box>
    );
  }

  if (!event) {
    return (
      <Box
        sx={{
          margin: { xs: 1, sm: 7 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Event not found</Typography>
      </Box>
    );
  }

  return (
    <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
      <Box
        sx={{
          margin: { xs: 1, sm: 7 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            backgroundColor: "paper",
            marginBottom: 4,
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
                  bgcolor: "secondary.main",
                  color: "background.default",
                }}
              >
                <EventIcon />
              </Avatar>
              <Typography marginLeft={1}>
                {moment(event.date).format("DD/MM/YYYY")} at{" "}
                {moment(event.time, "HH:mm").format("HH:mm")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: "secondary.main",
                  color: "background.default",
                }}
              >
                <PlaceIcon />
              </Avatar>
              <Typography marginLeft={1}>
                {event.city}, {event.address}
              </Typography>
            </Box>
            <Divider sx={{ marginTop: 2.5 }} />
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
                    activeTab === "about" ? "3px solid #15E9C5" : "none",
                  borderRadius: "0",
                  color: "text.primary",
                  marginBottom: -0.2,
                }}
              >
                About
              </Button>
              <Button
                onClick={() => handleTabClick("discussion")}
                sx={{
                  borderBottom:
                    activeTab === "discussion" ? "3px solid #15E9C5" : "none",
                  borderRadius: "0",
                  color: "text.primary",
                  marginBottom: -0.2,
                }}
              >
                Discussion
              </Button>
              <Button
                color="primary"
                onClick={handleGoingToEvent}
                disabled={
                  new Date(event.date) < new Date() ||
                  currentUser?.uid === event.creator
                }
                sx={{
                  margin: 1,
                  borderRadius: 5,
                  marginLeft: "auto",
                  textTransform: "none",
                  alignSelf: "flex-end",
                  boxShadow: !isLoggedUserParticipantInEvent
                    ? "0px 0px 3px 1px #B63EFD"
                    : "none",
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
                style={{
                  display: activeTab === "about" ? "block" : "none",
                }}
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
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
}
