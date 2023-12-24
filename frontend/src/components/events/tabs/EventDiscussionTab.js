import React from "react";

import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/auth-context";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import OutlinedInput from "@mui/material/OutlinedInput";

import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";

export default function EventDiscussionTab({ users, discussionBoard }) {
  const { eventId } = useParams();
  const { user } = useAuth();

  const filteredDiscussion = discussionBoard?.find(
    (item) => item.eventId === eventId
  )?.content;

  const getUserInfo = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const userProfilePicture = user?.profilePicture;

  console.log("re-render discussion tab");
  return (
    <Box>
      {filteredDiscussion.map((message, index) => {
        const userInfo = getUserInfo(message.userId);

        return (
          <Box key={index} sx={{ display: "flex" }}>
            <Avatar sx={{ marginTop: 1 }} src={userInfo?.profilePicture} />
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                backgroundColor: "#efefef",
                borderRadius: 4,
                margin: 0.5,
                padding: 1,
              }}
            >
              <Typography fontWeight={"bold"}>
                {userInfo?.firstName} {userInfo?.lastName}
              </Typography>
              <Typography>{message.message}</Typography>
              <Typography variant={"body2"}>{message.creationTime}</Typography>
            </Box>
          </Box>
        );
      })}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: 3,
        }}
      >
        <Avatar src={userProfilePicture} />
        <OutlinedInput
          multiline
          sx={{
            width: "100%",
            backgroundColor: "#efefef",
            margin: 0.5,
          }}
          placeholder="Write a comment..."
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        ></OutlinedInput>
      </Box>
    </Box>
  );
}
