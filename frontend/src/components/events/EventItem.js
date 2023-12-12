import { useState } from "react";

import { useParams } from "react-router-dom";

import styled from "@mui/system/styled";

import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import AvatarGroup from "@mui/material/AvatarGroup";
import CardContent from "@mui/material/CardContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

export default function EventItem(props) {
  const { id } = useParams();

  const [tabValue, setTabValue] = useState("1");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  // Find the event with the matching ID
  const event = props.events.find((event) => event.id === id);

  // Return a loading message or handle the case where the event is not found
  if (!event) {
    return <div>Event was not found</div>;
  }

  // Map participants to user names
  const participants = event.participants.map((participantId) => {
    // Find the corresponding user for the current participant ID
    const user = props.users.find((user) => user.id === participantId);

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
  const creatorUser = props.users.find((user) => user.id === eventCreator);

  // Get the creator's first name if found, or use a placeholder if not
  const creator = creatorUser
    ? creatorUser.firstName
    : `Unknown User (${eventCreator})`;

  const StyledDiv = styled("div")({
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
    <Card
      sx={{
        backgroundColor: "#FCFDFF",
      }}
    >
      <CardMedia sx={{ height: 210 }} image={event.image} />
      <CardContent>
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
        <Box sx={{ width: {xs:300, sm:550}, typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
                  startIcon={<CheckCircleOutlineOutlinedIcon />}
                  sx={{ textTransform: "none", margin: 1, borderRadius:5, marginLeft: {xs:2, sm:6} }}
                >
                  Going
                </Button>
              </TabList>
            </Box>
            <TabPanel value="1">
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
                    <StyledDiv key={index}>
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
                    </StyledDiv>
                  ))}
                </DialogContent>
                <DialogActions sx={{ position: "absolute", top: 0, right: 0 }}>
                  <CloseIcon onClick={handleModalClose} />
                </DialogActions>
              </Dialog>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
        </Box>
      </CardContent>
    </Card>
  );
}
