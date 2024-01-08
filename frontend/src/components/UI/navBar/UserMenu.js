import { Avatar, Box, IconButton, Tooltip } from "@mui/material";

export function UserMenu({ handleOpenUserMenu, currentUser }) {
  return (
    currentUser && (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0, color: "primary.dark" }}
          >
            <Avatar
              alt={currentUser?.firstName}
              src={currentUser?.photoURL}
              sx={{ backgroundColor: "rgba(247, 154, 70, 0.8)" }}
            />
          </IconButton>
        </Tooltip>
      </Box>
    )
  );
}