import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export default function GameLoadingSkeleton() {
  return (
    <Stack spacing={0.5} sx={{ width: 350, margin: 1 }}>
      <Skeleton variant="rounded" height={145} />
      <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width="30%" />
      <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} width="45%" />
      <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} width="50%" />
      <Skeleton width="90%" />
      <Skeleton width="90%" />
      <Skeleton width="90%" />
      <Skeleton width="90%" />
      <Skeleton width="90%" />
      <Skeleton width="90%" />
      <Skeleton width="90%" />
      <Skeleton width="90%" />
    </Stack>
  );
}
