import GameList from "../../components/games/GameList";
import SearchBar from "../../components/searchBar/SearchBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function ExploreGames(props) {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", margin: 3 }}>
        <SearchBar data={props.games} />
        {/* filter by genre, age, limit here */}
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <GameList games={props.games} />
      </Stack>
    </Box>
  );
}
