import React, { useState } from "react";

import GameList from "../../components/games/GameList";
import SearchBar from "../../components/searchBar/SearchBar";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function ExploreGames(props) {
  const [filteredGames, setFilteredGames] = useState(props.games);

  const handleSearch = (searchQuery) => {
    // Filter the games based on the search query
    const filteredData = props.games.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update the state with the filtered data
    setFilteredGames(filteredData);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", margin: 3 }}>
        {/* Pass the handleSearch function to the SearchBar component */}
        <SearchBar onSearch={handleSearch} />
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Pass the filteredGames state to the GameList component */}
        <GameList games={filteredGames} />
      </Stack>
    </Box>
  );
}
