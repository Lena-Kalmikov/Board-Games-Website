// import { useState } from "react";
import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: 400,
        borderRadius: 4,
        backgroundColor: "rgba(247, 247, 247, 0.8)",
        boxShadow: 1,
      }}
    >
      <SearchIcon
        sx={{ color: "primary.dark", marginRight: 1, marginLeft: 0.5 }}
      />
      <Input
        placeholder="search..."
        value={searchQuery}
        onChange={handleChange}
        sx={{
          width: 200,
          color: "rgba(34, 37, 41, 0.8)",
          fontSize: "1.1rem",
        }}
        disableUnderline
      />
    </Box>
  );
}
