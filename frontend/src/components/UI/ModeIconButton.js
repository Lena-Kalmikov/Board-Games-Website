import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ModeIconButton({ darkMode, setDarkMode }) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 2,
        right: 2,
      }}
    >
      <IconButton
        sx={{ marginLeft: 1 }}
        onClick={() => setDarkMode(!darkMode)}
        color="inherit"
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}
