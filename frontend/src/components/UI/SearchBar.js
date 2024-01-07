import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
  const handleChange = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <Box>
      <TextField
        name="searchQuery"
        placeholder="Search games"
        variant="outlined"
        size="small"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{ color: "primary.main", marginRight: 1, marginLeft: 0.5 }}
              />
            </InputAdornment>
          ),
          sx: {
            fontSize: "1.1rem",
            borderRadius: 5,
            backgroundColor: "default",
            boxShadow: 1,
            width: 350,
          },
        }}
      />
    </Box>
  );
}
