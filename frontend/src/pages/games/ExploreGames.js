import React from "react";
import useInputFilter from "../../hooks/useInputFilter";

import GameList from "../../components/games/GameList";
import SearchBar from "../../components/searchBar/SearchBar";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function ExploreGames(props) {
  const { filteredData, filterData } = useInputFilter(props.games, "title");

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", margin: 3 }}>
        {/* Pass the filterData function to the SearchBar component */}
        <SearchBar onSearch={filterData} />
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
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