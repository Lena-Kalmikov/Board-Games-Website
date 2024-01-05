import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export default function EventPreviewLoadingSkeleton() {
  return (
    <Stack spacing={0.5} sx={{ width: 310, margin: 1.5 }}>
      <Skeleton variant="rounded" height={190} />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="90%" />
      <Box sx={{ paddingTop: 1 }}>
        <Skeleton height={30} />
      </Box>
    </Stack>
  );
}
