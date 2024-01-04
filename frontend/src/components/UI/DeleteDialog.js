import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function DeleteDialog({ isOpen, onClose, onDelete, item }) {
  return (
    <Dialog open={isOpen} keepMounted onClose={onClose}>
      <DialogContent>
        <DialogContentText color="black" mt={2} mb={-1}>
          Are you sure you want to delete this {item}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            color: "salmon",
            "&:hover": { backgroundColor: "#fff6f3" },
          }}
          onClick={onDelete}
        >
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
