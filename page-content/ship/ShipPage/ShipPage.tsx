import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import { DetailedShip } from "../../../api/ship/types";
import { GetShipsResult, GET_SHIP } from "../../../api/ship/queries/getShips";
import { ShipPagePlaceholder, ShipPageError, ShipPageContent } from "./components";

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

export const ShipPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery<GetShipsResult<DetailedShip>>(GET_SHIP, {
    variables: {
      id
    },
    skip: !id
  });

  if (loading || !data) return <PageContainer><ShipPagePlaceholder /></PageContainer>;

  if (!data && !loading && error) {
    console.error("Error on /ship/id, GET_SHIP query:", error);
    return <PageContainer><ShipPageError /></PageContainer>;
  }

  return (
    <PageContainer>
      <ShipPageContent ship={data.ships[0]} />
    </PageContainer>
  );
};

const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <Container maxWidth="lg">
    <Grid2 container spacing={2}>
      {children}
    </Grid2>
  </Container>
)
