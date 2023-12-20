import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../context/auth-context";

import EventAboutTab from "../components/events/tabs/EventAboutTab";
import EventDiscussionTab from "../components/events/tabs/EventDiscussionTab";

import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
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

export default function Event({ events, users, games, onUpdateEvent }) {
  const { user } = useAuth();
  const { eventId } = useParams();
  const navigate = useNavigate();

  const event = events.find((event) => event.id === eventId);

  const [tabValue, setTabValue] = useState("1");

  const [isLoggedUserParticipantInEvent, setIsLoggedUserParticipantInEvent] =
    useState(event?.participants.includes(user?.id) || false);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
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

    // first part checks if user is a participant in event, if yes - he's removed from event.
    // second part handles the other case - if user is not a participant in event - he's added to it.
    const updatedParticipants = isLoggedUserParticipantInEvent
      ? event.participants.filter((participantId) => participantId !== user.id)
      : [...event.participants, user.id];

    setIsLoggedUserParticipantInEvent(!isLoggedUserParticipantInEvent);

    // spread operator uses the current event data + sets participants to be the updatedParticipants determined before.
    const updatedEvent = { ...event, participants: updatedParticipants };

    // sends updated data to the EVENTS array in app.js
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
        <CardContent sx={{ maxWidth: 550 }}>
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
          <TabContext value={tabValue}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <TabList onChange={handleTabChange}>
                <Tab label="About" value="1" sx={{ textTransform: "none" }} />
                <Tab
                  label="Discussion"
                  value="2"
                  sx={{ textTransform: "none" }}
                />
                <Button
                  color="secondary"
                  onClick={handleGoingToEvent}
                  sx={{
                    textTransform: "none",
                    margin: 1,
                    borderRadius: 5,
                    marginLeft: "auto",
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
              </TabList>
            </Box>
            <TabPanel value="1">
              <EventAboutTab event={event} users={users} games={games} />
            </TabPanel>
            <TabPanel value="2">
              <EventDiscussionTab users={users} />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </Box>
  );
}
