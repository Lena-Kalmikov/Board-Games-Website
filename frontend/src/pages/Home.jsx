import HeroSection from "../components/home/HeroSection";
import EventsSample from "../components/home/EventsSample";
import CallToAction from "../components/home/CallToAction";

import useFadeInEffect from "../hooks/useFadeInEffect";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

export default function Home({ events, isEventsLoading }) {
  const isComponentLoaded = useFadeInEffect();

  return (
    <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
      <Box marginBottom={7}>
        <HeroSection />
        <EventsSample events={events} isEventsLoading={isEventsLoading} />
        <CallToAction />
      </Box>
    </Fade>
  );
}
