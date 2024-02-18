import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";

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
          <Box
            component={Link}
            to={`/${participant.id}`}
            key={participant.id}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: 1.5,
              textDecoration: "none",
              color: "text.primary",
              "&:hover": {
                backgroundColor: "background.default",
              },
            }}
          >
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
          </Box>
        ))}
      </DialogContent>
      <DialogActions sx={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={onClose} data-testid="close-button">
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
