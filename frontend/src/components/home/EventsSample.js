import { Link } from "react-router-dom";

import useFadeInEffect from "../../hooks/useFadeInEffect";
import EventPreviewList from "../events/preview/EventPreviewList";
import EventPreviewLoadingSkeleton from "../UI/skeletons/EventPreviewLoadingSkeleton";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Links from "@mui/material/Link";

export default function EventsSample({ events }) {
  const isComponentLoaded = useFadeInEffect();

  const skeletonNumber = 4;
  const isLoading = events.length === 0;

  return (
    <Fade in={isComponentLoaded} timeout={{ enter: 1000 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", xl: "row" },
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        {isLoading ? (
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
                <EventPreviewLoadingSkeleton key={index} />
              ))}
          </Box>
        ) : (
          <Box>
            <EventPreviewList
              events={events.slice(0, 4)}
              justifyContent={"center"}
            />
            <Links
              component={Link}
              to="/events"
              sx={{
                margin: 1,
                fontSize: 16,
                borderRadius: 2,
                display: "flex",
                textTransform: "none",
                justifyContent: "center",
              }}
            >
              Go to events page for more events
            </Links>
          </Box>
        )}
      </Box>
    </Fade>
  );
}
