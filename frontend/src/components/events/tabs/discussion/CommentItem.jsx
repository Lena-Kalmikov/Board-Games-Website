import React from "react";
import moment from "moment";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

const CommentItem = (props) => (
  <Box key={props.data.messageId} sx={{ display: "flex", wrap: "wrap" }}>
    <Avatar sx={{ marginTop: 1 }} src={props.data.avatarSrc} />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflowWrap: "break-word",
        backgroundColor: "background.lightPaper",
        borderRadius: 4,
        margin: 0.5,
        marginRight: 2,
        padding: 1,
      }}
    >
      <Typography marginBottom={-0.3} fontWeight={"bold"} fontSize={14}>
        {props.data.userName}
      </Typography>
      {props.editingMessageId !== props.data.messageId && (
        <Typography fontSize={14}>{props.data.message}</Typography>
      )}

      {props.editingMessageId === props.data.messageId && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <OutlinedInput
            multiline
            value={props.inputValue}
            inputRef={props.editedInputRef}
            onKeyDown={props.handleEditMessageEnter}
            onChange={props.handleEditedInputChange}
            sx={{
              margin: 0.5,
              fontSize: 14,
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={props.handleEditMessage}
                  disabled={props.isEditButtonDisabled}
                >
                  <SendIcon
                    sx={{
                      color: props.isEditButtonDisabled
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
              color: "secondary.main",
              "&:hover": {
                backgroundColor: "rgba(209, 203, 213, 0.28)",
              },
            }}
            onClick={() => props.setEditingMessageId(null)}
          >
            Cancel
          </Button>
        </Box>
      )}

      <Typography
        fontSize={"0.80rem"}
        color={"text.footer"}
        letterSpacing={"-0.02rem"}
        marginTop={0.3}
      >
        {props.data.creationTime &&
          moment(props.data.creationTime.toDate()).format("HH:mm DD/MM/YY")}
      </Typography>
    </Box>

    {props.currentUser?.uid === props.data.userId && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <IconButton
          size="small"
          onClick={() =>
            props.handleSetMessageForEditing(
              props.data.messageId,
              props.data.message
            )
          }
        >
          <ModeEditOutlinedIcon
            fontSize="inherit"
            sx={{
              "&:hover": { color: "rgba(236, 209, 65, 1)" },
            }}
          />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            props.setDeleteMessageId(props.data.messageId);
            props.setIsDeleteDialogOpen(true);
          }}
        >
          <DeleteOutlinedIcon
            fontSize="inherit"
            sx={{
              "&:hover": { color: "error.main" },
            }}
          />
        </IconButton>
      </Box>
    )}
  </Box>
);

export default CommentItem;
