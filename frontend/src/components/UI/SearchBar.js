// import { useState } from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Call the onSearch function (which is in the explore games component)
    // with the current query (even.target.value)
    onSearch(query);
  };

  return (
    <Box>
      <TextField
        placeholder="Search games"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{ color: "primary.dark", marginRight: 1, marginLeft: 0.5 }}
              />
            </InputAdornment>
          ),
          sx: {
            fontSize: "1.1rem",
            borderRadius: 5,
            backgroundColor: "rgba(247, 247, 247, 0.8)",
            boxShadow: 1,
            width: 350,
          },
        }}
      />
    </Box>
  );
}