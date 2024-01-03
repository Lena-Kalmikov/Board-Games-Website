import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import db from "../../../firebase";
import { useAuth } from "../../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";

import moment from "moment";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

const EventDiscussionTab = React.memo(
  ({ users, discussionBoards, eventId }) => {
    const inputRef = useRef(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const currentUser = useAuth();

    const getUserInfo = (userId) => {
      return users?.find((user) => user.id === userId);
    };

    // comparing eventId from url param to the eventId in the discussionboards array and getting it's content.
    const eventDiscussionBoard = discussionBoards?.find(
      (discussionBoard) => discussionBoard.eventId === eventId
    )?.content;

    // mapping over the content data from the event discussion board.
    // comparing userId from content to userId in users and extracting the username and image.
    const contentData = eventDiscussionBoard?.map((content) => {
      const userInfo = getUserInfo(content.userId);
      return {
        avatarSrc: userInfo?.profilePicture,
        userName: `${userInfo?.firstName} ${userInfo?.lastName}`,
        userId: content.userId,
        message: content.message,
        creationTime: content.creationTime,
      };
    });

    const handleInputChange = () => {
      const inputValue = inputRef.current.value.trim();
      setIsButtonDisabled(inputValue === "");
    };

    const handleEnterKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSendMessage();
      }
    };

    const handleSendMessage = async () => {
      const inputValue = inputRef.current.value.trim();

      if (currentUser && inputValue !== "") {
        const discussionBoardsRef = collection(db, "discussion_boards");
        const q = query(discussionBoardsRef, where("eventId", "==", eventId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docRef = doc(db, "discussion_boards", querySnapshot.docs[0].id);
          await updateDoc(docRef, {
            content: arrayUnion({
              userId: currentUser.uid,
              messageId: uuidv4(),
              message: inputValue,
              creationTime: new Date(),
            }),
          });
        }

        inputRef.current.value = "";
        setIsButtonDisabled(true);
      }
    };

    return (
      <Box>
        {contentData?.map((data) => (
          <Box key={data.messageId} sx={{ display: "flex" }}>
            <Avatar sx={{ marginTop: 1 }} src={data.avatarSrc} />
            <Stack
              sx={{
                backgroundColor: "#efefef",
                borderRadius: 4,
                margin: 0.5,
                padding: 1,
              }}
            >
              <Typography fontWeight={"bold"}>{data.userName}</Typography>
              <Typography>{data.message}</Typography>
              <Typography
                fontSize={"0.80rem"}
                color={"GrayText"}
                sx={{ letterSpacing: "-0.02rem" }}
              >
                {data.creationTime &&
                  moment(data.creationTime.toDate()).format("HH:mm DD/MM/YY")}
              </Typography>
            </Stack>
            {currentUser?.uid === data.userId && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton size="small">
                  <ModeEditOutlinedIcon
                    fontSize="inherit"
                    sx={{ color: "#7cb342" }}
                  />
                </IconButton>
                <IconButton size="small">
                  <DeleteOutlinedIcon
                    fontSize="inherit"
                    sx={{
                      color: "#f44336",
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
        {currentUser ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: 3,
            }}
          >
            <Avatar src={currentUser.photoURL} />
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
            <Button
              variant="outlined"
              component={Link}
              to="/login"
              sx={{
                textTransform: "none",
              }}
            >
              Login to comment
            </Button>
          </Box>
        )}
      </Box>
    );
  }
);
export default EventDiscussionTab;
