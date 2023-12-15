import React from "react";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";

import GameItem from "../../games/GameItem";

export default function EventGameDialog({ isOpen, onClose, game }) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontSize: "1.5rem", textAlign: "center" }}>
        {game.title}
      </DialogTitle>
      <DialogContent>
        <GameItem {...game} />
      </DialogContent>
      <DialogActions sx={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
