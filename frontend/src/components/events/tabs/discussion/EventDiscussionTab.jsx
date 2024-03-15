import React, { useState, useRef } from "react";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import DeleteDialog from "../../../UI/DeleteDialog";
import { useNavigate, useLocation } from "react-router-dom";
import db from "../../../../utils/firebase";
import {
  getEventBoard,
  getContentData,
  handleEnterKeyDown,
} from "../../../../utils/eventDiscussionTabUtils";
import {
  useAuth,
  sendMessageToFirebase,
  editMessageOnFirebase,
  deleteMessageFromFirebase,
} from "../../../../utils/firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const EventDiscussionTab = React.memo(
  ({ users, discussionBoards, eventId }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = useAuth();
    const inputRef = useRef(null);
    const editedInputRef = useRef(null);

    const [inputValue, setInputValue] = useState("");
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteMessageId, setDeleteMessageId] = useState(null);
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isEditButtonDisabled, setIsEditButtonDisabled] = useState(true);

    const eventDiscussionBoard = getEventBoard(discussionBoards, eventId);
    const contentData = getContentData(users, eventDiscussionBoard);

    const handleRedirectToLogin = () => {
      navigate("/login", { state: { from: location } });
    };

    const handleInputChange = () => {
      const inputValue = inputRef.current.value;
      setIsButtonDisabled(inputValue === "");
    };

    const handleSendMessage = async () => {
      await sendMessageToFirebase(
        currentUser,
        eventId,
        inputRef.current.value,
        inputRef,
        setIsButtonDisabled
      );
    };

    const handleEditedInputChange = () => {
      const inputValue = editedInputRef.current.value;
      setIsEditButtonDisabled(inputValue === "");
      setInputValue(inputValue);
    };

    const handleSetMessageForEditing = (messageId, message) => {
      setEditingMessageId(messageId);
      setInputValue(message);
    };

    const handleEditMessage = async () => {
      await editMessageOnFirebase(
        db,
        currentUser,
        eventId,
        inputValue,
        editingMessageId,
        setEditingMessageId,
        setIsEditButtonDisabled
      );
    };

    const handleDeleteMessage = async (messageId) => {
      await deleteMessageFromFirebase(db, eventId, messageId);
    };

    const handleSendMessageOnEnterKey = handleEnterKeyDown(handleSendMessage);
    const handleEditMessageEnter = handleEnterKeyDown(handleEditMessage);

    if (!currentUser) {
      return (
        <Box
          sx={{
            marginTop: 3,
            marginLeft: 6,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleRedirectToLogin}
            sx={{
              textTransform: "none",
            }}
          >
            Login to comment
          </Button>
        </Box>
      );
    }

    return (
      <Box>
        {contentData?.map((data) => (
          <CommentItem
            key={data.messageId}
            data={data}
            currentUser={currentUser}
            editingMessageId={editingMessageId}
            inputValue={inputValue}
            editedInputRef={editedInputRef}
            handleSetMessageForEditing={handleSetMessageForEditing}
            handleEditMessageEnter={handleEditMessageEnter}
            handleEditedInputChange={handleEditedInputChange}
            handleEditMessage={handleEditMessage}
            setEditingMessageId={setEditingMessageId}
            isEditButtonDisabled={isEditButtonDisabled}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            setDeleteMessageId={setDeleteMessageId}
          />
        ))}

        {!contentData && <Box>No comments yet.</Box>}

        {currentUser && (
          <CommentInput
            inputRef={inputRef}
            currentUser={currentUser}
            handleSendMessage={handleSendMessage}
            handleSendMessageOnEnterKey={handleSendMessageOnEnterKey}
            handleInputChange={handleInputChange}
            isButtonDisabled={isButtonDisabled}
          />
        )}

        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={() => {
            handleDeleteMessage(deleteMessageId);
            setIsDeleteDialogOpen(false);
          }}
          item="message"
        />
      </Box>
    );
  }
);

export default EventDiscussionTab;
