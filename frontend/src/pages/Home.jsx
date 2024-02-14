import HeroSection from "../components/home/HeroSection";
import EventsSample from "../components/home/EventsSample";
import CallToAction from "../components/home/CallToAction";

import Box from "@mui/material/Box";

export default function Home({ events, isEventsLoading }) {
  return (
    <Box margin={2} marginBottom={10}>
      <HeroSection />
      <EventsSample events={events} isEventsLoading={isEventsLoading} />
      <CallToAction />
    </Box>
  );
}
