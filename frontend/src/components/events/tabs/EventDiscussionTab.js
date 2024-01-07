import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import db from "../../../firebase";
import { useAuth } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import DeleteDialog from "../../UI/DeleteDialog";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import Box from "@mui/material/Box";
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
    const currentUser = useAuth();
    const inputRef = useRef(null);
    const editedInputRef = useRef(null);

    const [inputValue, setInputValue] = useState("");
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isEditingButtonDisabled, setIsEditingButtonDisabled] =
      useState(true);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteMessageId, setDeleteMessageId] = useState(null);

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
        messageId: content.messageId,
      };
    });

    const handleInputChange = () => {
      const inputValue = inputRef.current.value.trim();
      setIsButtonDisabled(inputValue === "");
    };

    const handleEditedInputChange = () => {
      const inputValue = editedInputRef.current.value.trim();
      setIsEditingButtonDisabled(inputValue === "");
      setInputValue(inputValue);
    };

    const handleEnterKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSendMessage();
      }
    };

    const handleEnterKeyDownOnEdit = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleEditMessage();
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

    const handleSetMessageForEditing = (messageId, message) => {
      setEditingMessageId(messageId);
      setInputValue(message);
    };

    const handleEditMessage = async () => {
      if (currentUser && inputValue !== "") {
        const discussionBoardsRef = collection(db, "discussion_boards");
        const q = query(discussionBoardsRef, where("eventId", "==", eventId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docRef = doc(db, "discussion_boards", querySnapshot.docs[0].id);

          // Get the current content from the document
          const eventDiscussionBoard = await getDoc(docRef);
          const contentArray = eventDiscussionBoard.data().content;

          // Find the index of the message to be updated
          const messageIndex = contentArray.findIndex(
            (content) => content.messageId === editingMessageId
          );

          if (messageIndex !== -1) {
            // Update the message content in the array
            contentArray[messageIndex].message = inputValue;

            // Update the document with the modified content
            await updateDoc(docRef, {
              content: contentArray,
            });

            // Clear the editing state
            setEditingMessageId(null);
            setIsEditingButtonDisabled(true);
          }
        }
      }
    };

    const handleDeleteMessage = async (messageId) => {
      const discussionBoardsRef = collection(db, "discussion_boards");
      const q = query(discussionBoardsRef, where("eventId", "==", eventId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = doc(db, "discussion_boards", querySnapshot.docs[0].id);
        const eventDiscussionBoard = await getDoc(docRef);
        const contentArray = eventDiscussionBoard.data().content;

        const messageToDelete = contentArray.find(
          (content) => content.messageId === messageId
        );

        if (messageToDelete) {
          await updateDoc(docRef, {
            content: arrayRemove(messageToDelete),
          });
        }
      }
    };

    return (
      <Box>
        {contentData?.map((data) => (
          <Box key={data.messageId} sx={{ display: "flex", wrap: "wrap" }}>
            <Avatar sx={{ marginTop: 1 }} src={data.avatarSrc} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#efefef",
                borderRadius: 4,
                margin: 0.5,
                padding: 1,
                overflowWrap: "break-word",
              }}
            >
              <Typography marginBottom={-0.5} fontWeight={"bold"}>
                {data.userName}
              </Typography>
              {editingMessageId === data.messageId ? (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <OutlinedInput
                    multiline
                    value={inputValue}
                    inputRef={editedInputRef}
                    onKeyDown={handleEnterKeyDownOnEdit}
                    onChange={handleEditedInputChange}
                    sx={{
                      backgroundColor: "#efefef",
                      margin: 0.5,
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleEditMessage}
                          disabled={isEditingButtonDisabled}
                        >
                          <SendIcon
                            sx={{
                              color: isEditingButtonDisabled
                                ? "disabled"
                                : "primary.main",
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <Button
                    variant="text"
                    sx={{
                      textTransform: "none",
                      alignSelf: "flex-end",
                      marginBottom: -3.3,
                      "&:hover": { backgroundColor: "#efefef" },
                    }}
                    onClick={() => setEditingMessageId(null)}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Typography>{data.message}</Typography>
              )}
              <Typography
                fontSize={"0.80rem"}
                color={"GrayText"}
                letterSpacing={"-0.02rem"}
                marginTop={0.3}
              >
                {data.creationTime &&
                  moment(data.creationTime.toDate()).format("HH:mm DD/MM/YY")}
              </Typography>
            </Box>
            {currentUser?.uid === data.userId && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <IconButton size="small">
                  <ModeEditOutlinedIcon
                    fontSize="inherit"
                    sx={{
                      "&:hover": { color: "#7cb342" },
                    }}
                    onClick={() =>
                      handleSetMessageForEditing(data.messageId, data.message)
                    }
                  />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => {
                    setDeleteMessageId(data.messageId);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <DeleteOutlinedIcon
                    fontSize="inherit"
                    sx={{
                      "&:hover": { color: "#f44336" },
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={() => {
            handleDeleteMessage(deleteMessageId);
            setIsDeleteDialogOpen(false);
          }}
          item="message"
        />
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
              multiline
              placeholder="Write a comment..."
              inputRef={inputRef}
              onKeyDown={handleEnterKeyDown}
              onChange={handleInputChange}
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
                    sx={{
                      backgroundColor: isButtonDisabled
                        ? "disabled"
                        : "primary.main",
                      "&:hover": { backgroundColor: "primary.main" },
                    }}
                  >
                    <SendIcon
                      sx={{
                        color: isButtonDisabled ? "disabled" : "white",
                      }}
                    />
                  </IconButton>
                </InputAdornment>
              }
            />
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
