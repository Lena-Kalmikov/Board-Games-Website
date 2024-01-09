import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

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
            backgroundColor: "default",
            borderRadius: 5,
            boxShadow: 1,
            width: 350,
          },
        }}
      />
    </Box>
  );
}
