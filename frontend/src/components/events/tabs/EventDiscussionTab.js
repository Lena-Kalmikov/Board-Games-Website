import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth-context";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

const EventDiscussionTab = React.memo(
  ({ users, discussionBoards, eventId, onSendMessage }) => {
    const { user } = useAuth();
    const inputRef = useRef(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const userProfilePicture = user?.profilePicture;

    const getUserInfo = (userId) => {
      return users.find((user) => user.id === userId);
    };

    // comparing eventId from url param to the eventId in the discussionboards array and getting it's content.
    const eventDiscussionBoard = discussionBoards?.find(
      (discussionBoard) => discussionBoard.eventId === eventId
    )?.content;

    // mapping over the content data from the event discussion board.
    // comparing userId from content to userId in users and extracting the username and image.
    const contentData = eventDiscussionBoard.map((content) => {
      const userInfo = getUserInfo(content.userId);
      return {
        avatarSrc: userInfo?.profilePicture,
        userName: `${userInfo?.firstName} ${userInfo?.lastName}`,
        message: content.message,
        creationTime: content.creationTime,
      };
    });

    const handleInputChange = () => {
      const inputValue = inputRef.current.value.trim();
      // Enable or disable the button based on whether the input is empty
      setIsButtonDisabled(inputValue === "");
    };

    const handleSendMessage = () => {
      const inputValue = inputRef.current.value.trim();

      // Check if the user is logged in
      if (user && inputValue !== "") {
        console.log("User typed:", inputValue);

        // Add your logic to send the message or perform other actions here
        onSendMessage(eventId, user.id, inputValue);

        // Clear the input and disable the button
        inputRef.current.value = "";
        setIsButtonDisabled(true);
      }
    };

    const handleEnterKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSendMessage();
      }
    };

    return (
      <Box>
        {contentData.map((data, index) => (
          <Box key={index} sx={{ display: "flex" }}>
            <Avatar sx={{ marginTop: 1 }} src={data.avatarSrc} />
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
              <Typography fontWeight={"bold"}>{data.userName}</Typography>
              <Typography>{data.message}</Typography>
              <Typography variant={"body2"}>{data.creationTime}</Typography>
            </Box>
          </Box>
        ))}
        {user ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: 3,
            }}
          >
            <Avatar src={userProfilePicture} />
            <OutlinedInput
              placeholder="Write a comment..."
              inputRef={inputRef}
              onKeyDown={handleEnterKeyDown}
              onChange={handleInputChange}
              multiline
              sx={{
                width: "100%",
                backgroundColor: "#efefef",
                margin: 0.5,
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSendMessage}
                    disabled={isButtonDisabled}
                  >
                    <SendIcon
                      sx={{
                        color: isButtonDisabled ? "disabled" : "primary.main",
                      }}
                    />
                  </IconButton>
                </InputAdornment>
              }
            ></OutlinedInput>
          </Box>
        ) : (
          <Box
            sx={{
              marginTop: 3,
              marginLeft: 6,
            }}
          >
            <Link to="/login" variant="body2">
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                }}
              >
                Login to comment
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    );
  }
);
export default EventDiscussionTab;
