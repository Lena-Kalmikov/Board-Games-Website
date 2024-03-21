import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import video from "../../assets/heroSectionVideo.mp4";

export default function HeroSection() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        position: "relative",
        margin: "auto",
        overflow: "hidden",
        height: "100vh",
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          opacity: 0.2,
        }}
      >
        <source src={video} type="video/mp4" />
      </video>
      <Box
        sx={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          padding: { xs: 3, md: 1, lg: 10 },
          width: { xs: "100%", sm: "70%", md: "44%" },
        }}
      >
        <Typography
          marginBottom={1}
          fontWeight={"bold"}
          color={"secondary.main"}
          sx={{ fontSize: { xs: "1.3rem", sm: "1.6rem", md: "1.9rem" } }}
        >
          Unleash the Board Game Magic!
        </Typography>
        <Typography sx={{ fontSize: { xs: "1rem", sm: "1.3rem" } }}>
          Embark on a journey of fun and laughter with your friends. Create
          unforgettable moments by hosting your own board game meetup with the
          help of our website.
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "1rem", sm: "1.3rem" } }}
          marginTop={2}
        >
          Whether you're a strategic mastermind, a trivia guru, or just a casual
          player, bring your favorite board games to the table and let the good
          times roll. Connect with fellow gamers, share your passion, and make
          lasting memories together🚀
        </Typography>
      </Box>
    </Box>
  );
}
