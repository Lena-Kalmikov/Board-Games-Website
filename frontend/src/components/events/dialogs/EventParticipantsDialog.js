import styled from "@mui/system/styled";

import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import CloseIcon from "@mui/icons-material/Close";

const DialogDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: 8,
  transition: "backgroundColor 0.3s",
  "&:hover": {
    backgroundColor: "#eee",
  },
});

export default function EventParticipantsDialog({
  isOpen,
  onClose,
  participants,
  avatarWidth,
  avatarHeight,
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontSize: "1.5rem", textAlign: "center" }}>
        Participants
      </DialogTitle>
      <DialogContent>
        {participants.map((participant) => (
          <DialogDiv key={participant.id}>
            <Avatar
              alt={participant.firstName}
              src={participant.profilePicture}
              sx={{
                width: avatarWidth,
                height: avatarHeight,
                marginRight: 2,
              }}
            />
            <Typography>
              {participant.firstName} {participant.lastName}
            </Typography>
          </DialogDiv>
        ))}
      </DialogContent>
      <DialogActions sx={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
