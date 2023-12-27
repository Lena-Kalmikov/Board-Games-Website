import useInputSearch from "../hooks/useInputSearch";
import useFadeInEffect from "../hooks/useFadeInEffect";

import SearchBar from "../components/UI/SearchBar";
import GameList from "../components/games/GameList";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";

export default function Games({ games }) {
  const isLoaded = useFadeInEffect();

  const { filteredData, filterData } = useInputSearch(games, "title");

  return (
    <Box mb={4}>
      <Fade in={isLoaded} timeout={{ enter: 500 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: 5,
          }}
        >
          <SearchBar onSearch={filterData} />
        </Box>
      </Fade>
      <Fade in={isLoaded} timeout={{ enter: 500 }}>
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
      </Fade>
    </Box>
  );
}
