import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function EventDiscussionTab({ users }) {
  // create DISCUSSIONBOARD array of objects that contain user id, message and timestamp.
  // compare user id from DISCUSSIONBOARD array to user id from USERS's array
  // show user avatar + user name + message.
  // push new message to array using user id from auth context, it will save user id, message and timestamp to DISCUSSIONBOARD array.

  return (
    <Box>
      <TextField placeholder="Write a comment..."></TextField>
    </Box>
  );
}
