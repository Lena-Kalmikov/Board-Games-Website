import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function DeleteDialog({ isOpen, onClose, onDelete, item }) {
  return (
    <Dialog open={isOpen} keepMounted onClose={onClose}>
      <DialogContent>
        <DialogContentText color="text.primary" marginTop={2} marginBottom={-1}>
          Are you sure you want to delete this {item}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            color: "error.main",
            "&:hover": { backgroundColor: "background.deleteHover" },
          }}
          onClick={onDelete}
        >
          Delete
        </Button>
        <Button onClick={onClose} color={"secondary"}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
