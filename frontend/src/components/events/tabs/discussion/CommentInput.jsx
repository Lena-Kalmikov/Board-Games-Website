import React from "react";
import {
  IconButton,
  OutlinedInput,
  InputAdornment,
  Box,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const CommentInput = ({
  inputRef,
  currentUser,
  handleSendMessage,
  handleSendMessageOnEnterKey,
  handleInputChange,
  isButtonDisabled,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: 3,
        marginRight: 2,
      }}
    >
      <Avatar src={currentUser.photoURL} />
      <OutlinedInput
        multiline
        placeholder="Write a comment..."
        inputRef={inputRef}
        onKeyDown={handleSendMessageOnEnterKey}
        onChange={handleInputChange}
        sx={{
          width: "100%",
          margin: 0.5,
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleSendMessage}
              disabled={isButtonDisabled}
              sx={{
                backgroundColor: isButtonDisabled ? "disabled" : "primary.main",
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
  );
};

export default CommentInput;
