import React from "react";

import GameItem from "../../games/GameItem";

import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import CloseIcon from "@mui/icons-material/Close";


export default function EventGameDialog({ isOpen, onClose, game }) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
          marginBottom:2
        }}
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
      </DialogContent>
      <DialogActions sx={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
