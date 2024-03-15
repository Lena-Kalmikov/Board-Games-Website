import EventPreviewList from "./EventPreviewList";
import EventPreviewLoadingSkeleton from "../../UI/skeletons/EventPreviewLoadingSkeleton";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { skeletonNumber } from "../../../utils/globalVariables";

export default function PreviewEvents({ events, isEventsLoading }) {
  if (isEventsLoading) {
    return (
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
            <EventPreviewLoadingSkeleton key={index} {...item} />
          ))}
      </Box>
    );
  }

  if (!isEventsLoading && events.length === 0) {
    return (
      <Box
        sx={{
          margin: { xs: 1, sm: 7 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ marginTop: 5 }}>
          Events currently unavailable.
        </Typography>
      </Box>
    );
  }

  return <EventPreviewList events={events} justifyContent={"center"} />;
}
