import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import EventAboutTab from "../components/events/tabs/EventAboutTab";
import EventDiscussionTab from "../components/events/tabs/EventDiscussionTab";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

export default function Event({
  events,
  users,
  games,
  discussionBoard,
  onUpdateEvent,
}) {
  const { user } = useAuth();
  const { eventId } = useParams();
  const navigate = useNavigate();

  const event = events.find((event) => event.id === eventId);

  const [isLoggedUserParticipantInEvent, setIsLoggedUserParticipantInEvent] =
    useState(event?.participants.includes(user?.id) || false);

  const [activeTab, setActiveTab] = useState("about");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (!event) {
    return (
      <Box
        sx={{
          margin: { xs: 0, sm: 7 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        Event was not found :(
      </Box>
    );
  }

  const handleGoingToEvent = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const updatedParticipants = isLoggedUserParticipantInEvent
      ? event.participants.filter((participantId) => participantId !== user.id)
      : [...event.participants, user.id];

    setIsLoggedUserParticipantInEvent(!isLoggedUserParticipantInEvent);

    const updatedEvent = { ...event, participants: updatedParticipants };

    onUpdateEvent(updatedEvent);
  };

  return (
    <Box
      sx={{
        margin: { xs: 0, sm: 7 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          backgroundColor: "#FCFDFF",
        }}
      >
        <CardMedia sx={{ height: { xs: 150, sm: 210 } }} image={event.image} />
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
          <Box margin={1} marginTop={3}>
            <Box style={{ display: activeTab === "about" ? "block" : "none" }}>
              <EventAboutTab event={event} users={users} games={games} />
            </Box>
            <Box
              style={{ display: activeTab === "discussion" ? "block" : "none" }}
            >
              <EventDiscussionTab
                users={users}
                discussionBoard={discussionBoard}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
