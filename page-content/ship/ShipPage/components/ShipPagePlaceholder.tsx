import { Container, Typography, Skeleton, Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { IMAGE_HEIGHT } from "./ShipPageContent";

export const ShipPagePlaceholder = () => (
  <Container maxWidth="sm">
    <Grid2 container spacing={2}>
      <Grid2 xs={12}>
        <Typography variant="h1">
          <Skeleton />
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Box>
          <Skeleton variant="rectangular" height={IMAGE_HEIGHT} />
        </Box>
      </Grid2>
      <Grid2 xs={10}>
        <Skeleton variant="rectangular" width={200} height={24} />
      </Grid2>
      <Grid2 xs={2}>
        <Skeleton variant="rectangular" width="full" height={24} />
      </Grid2>
    </Grid2>
    <Grid2 width="100%" mt={2}>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", columnGap: 5, rowGap: 3 }}>
        {Array.from({ length: 12 }).map((_, count) => (
          <Box key={`placeholder-detail-${count}`}>
            <Skeleton variant="rectangular" width={64} height={16} sx={{ marginBottom: 1 }} />
            <Skeleton variant="rectangular" width={124} height={24} />
          </Box>
        ))}
      </Box>
    </Grid2>
  </Container>
);