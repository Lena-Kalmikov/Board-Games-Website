import React from "react";
import EventPreviewLoadingSkeleton from "./EventPreviewLoadingSkeleton";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function UserEventsLoadingSkeleton() {
  return (
    <Box>
      <Box margin={5}>
        <Skeleton variant="text" width="30%" height={30} sx={{ margin: 1.5 }} />
        <Box display={"flex"} flexDirection={"row"}>
          <EventPreviewLoadingSkeleton />
          <EventPreviewLoadingSkeleton />
        </Box>
        <Skeleton
          variant="text"
          width="30%"
          height={30}
          sx={{ margin: 1.5, marginTop: 8 }}
        />
        <Box display={"flex"} flexDirection={"row"}>
          <EventPreviewLoadingSkeleton />
          <EventPreviewLoadingSkeleton />
        </Box>
      </Box>
    </Box>
  );
}
