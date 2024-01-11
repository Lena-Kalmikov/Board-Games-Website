import useFadeInEffect from "../../hooks/useFadeInEffect";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

export default function HeroSection() {
  const isComponentLoaded = useFadeInEffect();

  return (
    <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          position: "relative",
          margin: "auto",
          maxWidth: 1000,
          backgroundColor: "background.paper",
          marginTop: { sm: 10 },
          marginBottom: 10,
          borderRadius: 5,
          boxShadow: 1,
        }}
      >
        <Box padding={2} marginLeft={4} width={"100%"}>
          <Typography
            fontSize={22}
            marginBottom={1}
            fontWeight={"bold"}
            color={"secondary.main"}
          >
            Unleash the Board Game Magic!
          </Typography>
          <Typography>
            Embark on a journey of fun and laughter with your friends. Create
            unforgettable moments by hosting your own board game meetup with the
            help of our website. Whether you're a strategic mastermind, a trivia
            guru, or just a casual player, bring your favorite board games to
            the table and let the good times roll. Connect with fellow gamers,
            share your passion, and make lasting memories together.
          </Typography>
        </Box>
        <Box
          sx={{
            margin: { sm: 5 },
            marginBottom: { xs: 2 },
            width: { xs: "85%", sm: "100%", md: "90%" },
          }}
        >
          <img
            alt=""
            src="https://firebasestorage.googleapis.com/v0/b/play-date-board-games-website.appspot.com/o/images%2Fec56be4b-f13d-444b-8fd6-018234fc84ef.png?alt=media&token=a6a87085-8b0e-4b33-85fe-f1dfd752ecb6"
            style={{
              maxWidth: "100%",
              borderRadius: 50,
            }}
          />
        </Box>
      </Box>
    </Fade>
  );
}
