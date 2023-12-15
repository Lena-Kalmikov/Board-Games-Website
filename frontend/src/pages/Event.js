import React from "react";

import { useState } from "react";
import { useParams } from "react-router-dom";

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

export default function Event({ events, users, games }) {
  const { eventId } = useParams();
  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const event = events.find((event) => event.id === eventId);

  if (!event) {
    return <div>Event was not found</div>;
  }

  // create "Going" button logic: on click appearance changes to filled, toggle - going/not going.
  // when going - push user to participants array in event object.
  // when not going - remove user from participants array in event logic.
  //component should re-render and avatar of new user should appear with rest of the participants.

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
                  variant="outlined"
                  color="secondary"
                  sx={{
                    textTransform: "none",
                    margin: 1,
                    borderRadius: 5,
                    marginLeft: "auto",
                  }}
                  startIcon={<CheckCircleOutlineOutlinedIcon />}
                >
                  Going
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
