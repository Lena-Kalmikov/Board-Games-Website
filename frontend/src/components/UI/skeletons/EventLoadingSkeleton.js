import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

export default function EventLoadingSkeleton() {
  return (
    <Card sx={{ width: { xs: 300, sm: 600 } }}>
      <CardMedia>
        <Skeleton variant="rectangular" height={210} />
      </CardMedia>
      <CardHeader
        sx={{ marginBottom: -3 }}
        avatar={<Skeleton variant="circular" width={45} height={45} />}
        title={<Skeleton height={20} width="30%" />}
      />
      <CardHeader
        avatar={<Skeleton variant="circular" width={45} height={45} />}
        title={<Skeleton height={20} width="40%" />}
      />
      <CardContent>
        <Box
          sx={{
            marginTop: -2,
            marginBottom: 2,
            display: "flex",
            flexDirection: "row",
            width: "95%",
          }}
        >
          <Skeleton width="45%" style={{ marginLeft: 3 }} />
          <Skeleton
            width="20%"
            style={{
              margin: 1,
              height: 45,
              borderRadius: 30,
              marginLeft: "auto",
              alignSelf: "flex-end",
            }}
          />
        </Box>
        <Stack spacing={1}>
          <Skeleton height={25} width="50%" style={{ marginBottom: 6 }} />
          <Skeleton height={10} width="95%" />
          <Skeleton height={10} width="95%" />
          <Skeleton height={10} width="95%" />
          <Skeleton height={10} width="95%" />
          <Skeleton height={10} width="70%" />
        </Stack>
        <Skeleton height={12} width="30%" style={{ marginTop: 20 }} />
        <Skeleton height={12} width="50%" style={{ marginTop: 10 }} />
        <Box
          sx={{
            width: "95%",
            marginTop: 2,
            marginBottom: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Skeleton
            height={12}
            width="20%"
            style={{ marginLeft: 3, marginRight: 5 }}
          />
          <Skeleton variant="circular" width={45} height={45} />
          <Skeleton
            variant="circular"
            width={45}
            height={45}
            style={{ marginLeft: -5 }}
          />
          <Skeleton
            variant="circular"
            width={45}
            height={45}
            style={{ marginLeft: -5 }}
          />
          <Skeleton
            variant="circular"
            width={45}
            height={45}
            style={{ marginLeft: -5 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
