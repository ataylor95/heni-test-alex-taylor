import { Box, Typography, CardMedia, Skeleton, Chip } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import { DetailedShip } from "../../../../api/ship/types";
import { Meta } from "../Meta";
import { Detail } from "./Detail";

export const IMAGE_HEIGHT = 400;

export const ShipPageContent: React.FC<{ ship: DetailedShip }> = ({ ship }) => {
  const {
    id: shipId,
    image,
    name,
    model,
    active,
    status,
    type,
    weight_kg,
    year_built,
    home_port,
    weight_lbs,
    successful_landings,
    imo,
    class: shipClass, // class is a reserved word
    abs,
    roles,
  } = ship;

  return (
    <>
      <Meta title={shipId} description={name} url={`/ship/${shipId}`} image={image} />
      <Grid2 xs={12}>
        <Box component={Typography} mt={2} mb={4} align="center" variant="h2">
          {name}
        </Box>
      </Grid2>
      <Grid2 xs={12} md={6}>
        <Box>
          {image ? (
            <CardMedia component="img" height={IMAGE_HEIGHT} image={image} alt={`image-of-${name}`} />
          ) : <Skeleton variant="rectangular" height={IMAGE_HEIGHT} />}
        </Box>
      </Grid2>
      <Grid2 container xs={12} md={6}>
        <Grid2 xs={8} sm={10} md={6} display="flex" alignItems="center">
          <Typography>
            Id: {shipId}
          </Typography>
        </Grid2>
        <Grid2 xs={4} sm={2} md={6} display="flex" justifyContent="end" alignContent={{ md: "center" }}>
          <Chip label={active ? "Active" : "Inactive"} color={active ? "secondary" : "error"} sx={{
            alignSelf: { xs: "flex-end", md: "center" }
          }} />
        </Grid2>
        <Grid2 width="100%">
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" }, columnGap: 5, rowGap: 3 }}>
            <Detail title="Model" content={model || "No model"} />
            <Detail title="Ship Class" content={shipClass} />
            <Detail title="Status" content={status || "-"} />
            <Detail title="Home Port" content={home_port} />
            <Detail title="Type" content={type} />
            <Detail title="Success Landings" content={successful_landings || 0} />
            <Detail title="Year Built" content={year_built} />
            <Detail title="Weight (Kg)" content={weight_kg} />
            <Detail title="Weight (Lb)" content={weight_lbs} />
            <Detail title="IMO" content={imo} />
            <Detail title="ABS" content={abs} />
            <Detail title="Roles" content={roles.map((role) => <Box key={role}>{role}</Box>)} />
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}