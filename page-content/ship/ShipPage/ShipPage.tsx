import React from "react";
import { useRouter } from "next/router";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";

import { Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import { DetailedShip, Ship } from "../../../api/ship/types";
import { GetShipsResult, GET_SHIP, GET_SHIP_IDS } from "../../../api/ship/queries/getShips";
import { ShipPagePlaceholder, ShipPageError, ShipPageContent } from "./components";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql",
  cache: new InMemoryCache(),
});

export const getStaticProps = () => {
  return {
    props: {}
  }
};

export async function getStaticPaths() {
  const query = await client.query<GetShipsResult<Ship>>({ query: GET_SHIP_IDS });

  return {
    paths: query.data.ships.map((ship) => ({
      params: { id: ship.id },
    })),
    fallback: false,
  };
}

export const ShipPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Choosing to do the query in here, rather than in getStaticPaths as it allows loading states which means the page will initially load quicker for better UX
  // The negative is that the SEO content is loaded after generation, so it is a trade off between UX and shareability
  // The homepage shows using staticprops to set up the SEO data on the server side
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
