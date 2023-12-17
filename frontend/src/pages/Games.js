import React from "react";

import useInputSearch from "../hooks/useInputSearch";

import SearchBar from "../components/UI/SearchBar";
import GameList from "../components/games/GameList";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function Games(props) {
  const { filteredData, filterData } = useInputSearch(props.games, "title");

  return (
    <Box mb={4}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: 5,
        }}
      >
        <SearchBar onSearch={filterData} />
      </Box>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <GameList games={filteredData} />
      </Stack>
    </Box>
  );
}
