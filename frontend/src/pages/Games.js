import SearchBar from "../components/UI/SearchBar";
import GameList from "../components/games/GameList";
import useInputSearch from "../hooks/useInputSearch";
import useFadeInEffect from "../hooks/useFadeInEffect";
import GameLoadingSkeleton from "../components/UI/skeletons/GameLoadingSkeleton";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";

export default function Games({ games }) {
  const isLoaded = useFadeInEffect();

  const { filteredData, filterData } = useInputSearch(games, "title");

  const skeletonNumber = 4;

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
          {games ? (
            <GameList games={filteredData} />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexWrap: { xs: "wrap" },
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {Array(skeletonNumber)
                .fill()
                .map((index) => (
                  <GameLoadingSkeleton key={index} />
                ))}
            </Box>
          )}
        </Stack>
      </Fade>
    </Box>
  );
}
