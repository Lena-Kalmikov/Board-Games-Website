import GameItem from "../../games/GameItem";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function EventGameDialog({ isOpen, onClose, game }) {
  if (!game) {
    return <div>No game found</div>;
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
          marginBottom: 2,
        }}
      >
        <Box
          style={{ overflow: "auto", maxHeight: { xs: "500px", sm: "800px" } }}
        >
          <GameItem
            key={game.id}
            id={game.id}
            title={game.title}
            minAgeLimit={game.minAgeLimit}
            minParticipantsLimit={game.minParticipantsLimit}
            maxParticipantsLimit={game.maxParticipantsLimit}
            description={game.description}
            image={game.image}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={onClose} data-testid="close-button">
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
