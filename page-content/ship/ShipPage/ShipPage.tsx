import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Link from "next/link";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Chip, Container, Skeleton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import CardMedia from "@mui/material/CardMedia";

import { DetailedShip } from "../../../api/ship/types";
import { GetShipsResult, GET_SHIP } from "../../../api/ship/queries/getShips";

export const getStaticProps = () => {
  return {
    props: {
      title: "SpaceX Ships",
      description: "SpaceX Ship List",
      url: "https://localhost:3000",
    },
  };
};

// TODO: Fix this mess
export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      '/ship/first-post',
      // Object variant:
      { params: { id: 'second-post' } },
    ],
    fallback: true
  }
}

const IMAGE_HEIGHT = 400

export const ShipPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery<GetShipsResult<DetailedShip>>(GET_SHIP, {
    variables: {
      id
    },
    skip: !id
  });

  if (loading || !data) return <ShipPagePlaceholder />

  if (!data && !loading && error) {
    console.error("Error on /ship/id, GET_SHIP query:", error);
    return <ShipPageError />;
  }

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
  } = data.ships[0];

  return (
    <Container maxWidth="sm">
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <Box component={Typography} mt={2} mb={4} align="center" variant="h2">
            {name}
          </Box>
        </Grid2>
        <Grid2 xs={12}>
          <Box>
            {image ? (
              <CardMedia component="img" height={IMAGE_HEIGHT} image={image} alt={`image-of-${name}`} />
            ) : <Skeleton variant="rectangular" height={IMAGE_HEIGHT} />}
          </Box>
        </Grid2>
        <Grid2 xs={10} display="flex" alignItems="center">
          <Typography>
            Id: {shipId}
          </Typography>
        </Grid2>
        <Grid2 xs={2} display="flex" justifyContent="end">
          <Chip label={active ? "Active" : "Inactive"} color={active ? "secondary" : "error"} style={{ alignSelf: "flex-end" }} />
        </Grid2>
        <Grid2 width="100%">
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", columnGap: 5, rowGap: 3 }}>
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
    </Container>
  );
};

const Detail: React.FC<{ title: string, content: React.ReactNode }> = ({ title, content }) => (
  <Box>
    <Typography variant="overline">{title}:</Typography>
    <Typography>{content}</Typography>
  </Box>
);

const ShipPagePlaceholder = () => (
  <Container maxWidth="sm">
    <Grid2 container spacing={2}>
      <Grid2 xs={12}>
        <Typography variant="h1">
          <Skeleton />
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Box>
          <Skeleton variant="rectangular" height={400} />
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

const ShipPageError = () => (
  <Container maxWidth="sm">
    <Typography variant="h3">
      Oops
    </Typography>
    <Typography>
      Something went wrong, try refreshing or
    </Typography>
    <Link href={"/"} passHref={true}>
      <Button size="medium">
        Go back
      </Button>
    </Link>
  </Container>
);