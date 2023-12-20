import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import "./Home.css";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        maxWidth: 1000,
        margin: { xs: 2, sm: "auto" },
        marginTop: { sm: 5 },
        position: "relative",
        // backgroundColor: "rgb(251, 239, 255)",
      }}
    >
      {/* Gradient Top Border */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          width: 115, // Adjust the height of the border as needed
          background: "linear-gradient(to right, pink, purple)",
          content: "''",
        }}
      ></Box>

      {/* Gradient Left Border */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 8, // Adjust the width of the border as needed
          height: 100,
          background: "linear-gradient(to bottom, pink, purple)",
          content: "''",
        }}
      ></Box>

      <Box
        sx={{
          width: "100%",
          padding: 3,
        }}
      >
        <Typography fontSize={35}>Game On.</Typography>
        <Typography fontSize={22}>Unleash the Board Game Magic!</Typography>
        <Typography>
          Immerse yourself in a realm of board game brilliance where excitement
          knows no bounds. Plan your next tabletop adventure effortlessly by
          scheduling meet-ups and game nights. Whether you're a seasoned player
          or new to the game, our community invites you to join the excitement.
          Brace yourself for unforgettable moments, new friendships, and the
          sheer joy of board games in a way that's effortlessly cool and
          eternally fun!
        </Typography>
      </Box>
      <Box sx={{ width: "100%", marginRight: 2 }}>
        <img
          alt=""
          src="https://images.pexels.com/photos/4691567/pexels-photo-4691567.jpeg?auto=compress&cs=tinysrgb&w=800"
          style={{ width: "100%", maxWidth: "100%" }}
        />
      </Box>
    </Box>
  );
}
