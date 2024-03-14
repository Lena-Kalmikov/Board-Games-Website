import SearchBar from "../components/UI/SearchBar";
import GameList from "../components/games/GameList";
import GameLoadingSkeleton from "../components/UI/skeletons/GameLoadingSkeleton";
import useInputSearch from "../hooks/useInputSearch";
import useFadeInEffect from "../hooks/useFadeInEffect";
import { skeletonNumber } from "../utils/globalVariables";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";

export default function Games({ games, isGamesLoading }) {
  const isComponentLoaded = useFadeInEffect();
  const { filteredData, filterData } = useInputSearch(games, "title");

  return (
    <Box marginBottom={4}>
      <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
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
      <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {isGamesLoading ? (
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
                .map((item, index) => (
                  <GameLoadingSkeleton key={index} {...item} />
                ))}
            </Box>
          ) : (
            <GameList games={filteredData} />
          )}
        </Stack>
      </Fade>
    </Box>
  );
}
