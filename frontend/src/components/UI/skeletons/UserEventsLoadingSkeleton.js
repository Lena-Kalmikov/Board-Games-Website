import React from "react";
import EventPreviewLoadingSkeleton from "./EventPreviewLoadingSkeleton";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export default function UserEventsLoadingSkeleton() {
  // Your component logic goes here

  return (
    <Box margin={5}>
      <Skeleton variant="text" width="30%" height={40} sx={{ margin: 1.5 }} />
      <EventPreviewLoadingSkeleton />
      <Skeleton
        variant="text"
        width="30%"
        height={40}
        sx={{ margin: 1.5, marginTop: 8 }}
      />
      <EventPreviewLoadingSkeleton />
    </Box>
  );
}
