// import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

export default function SearchBar(props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: 400,
        borderRadius: 4,
        marginTop: 1,
        marginRight: 1,
        backgroundColor: "rgba(247, 247, 247, 0.8)",
        boxShadow: 1,
      }}
    >
      <SearchIcon
        sx={{ color: "primary.dark", marginRight: 1, marginLeft: 0.5 }}
      />
      <Input
        placeholder="search..."
        onChange={props.onChange}
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
