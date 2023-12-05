import React from "react";
import useInputSearch from "../../hooks/useInputSearch";

import GameList from "../../components/games/GameList";
import SearchBar from "../../components/UI/SearchBar";
import SelectLabels from "../../components/UI/SelectLabels";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function ExploreGames(props) {
  const { filteredData, filterData } = useInputSearch(props.games, "title");

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: 3,
        }}
      >
        {/* Pass the filterData function to the SearchBar component */}

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
        {/* Pass the filteredData state to the GameList component */}
        <GameList games={filteredData} />
      </Stack>
    </Box>
  );
}
