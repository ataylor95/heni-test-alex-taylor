import React, { useRef, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Container } from "@mui/material";

import { Ship } from "../../../api/ship/types";
import { ShipCard } from "../../../containers/ship/ShipCard";
import { GetShipsResult, GET_SHIPS } from "../../../api/ship/queries/getShips";
import { Meta } from "./Meta";

export const getStaticProps = () => {
  return {
    props: {
      title: "SpaceX Ships",
      description: "SpaceX Ship List",
      url: "https://localhost:3000",
    },
  };
};

const DEFAULT_LIMIT = 5;

const observerIsIntersectingCallback = (entries: IntersectionObserverEntry[], callback: () => any) => {
  if (entries[0].isIntersecting) callback();
}

export const HomePage = () => {
  const infiniteScrollRef = useRef(null);
  const { data, loading, error, fetchMore } = useQuery<GetShipsResult<Ship>, { offset?: number, limit: number }>(GET_SHIPS, {
    variables: {
      limit: DEFAULT_LIMIT
    },
  });

  // TODO: Skip when API not returning any more
  const loadMoreShips = useCallback(() => fetchMore({
    variables: { offset: data?.ships.length || 0, limit: DEFAULT_LIMIT },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      return { ships: [...previousResult.ships, ...fetchMoreResult.ships] }
    }
  }), [data?.ships.length, fetchMore]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => observerIsIntersectingCallback(entries, loadMoreShips), {
      root: null,
      rootMargin: "100px", // Trigger effective 100px before element is intersected
      threshold: 1.0
    })
    if (infiniteScrollRef.current) observer.observe(infiniteScrollRef.current)

    return () => {
      if (infiniteScrollRef.current) observer.unobserve(infiniteScrollRef.current)
    }
  }, [infiniteScrollRef, loadMoreShips]);

  return (
    <>
      <Meta />
      <Container maxWidth="sm">
        <Box component={Typography} mt={2} mb={4} align="center" variant="h2">
          Ships
        </Box>
        <Container style={{ display: "flex", flexDirection: "column" }}>
          {data?.ships.map((ship, count) =>
            <ShipCard key={`ship-${count}`} ship={ship} loading={loading} />
          ) || Array.from({ length: 5 }).map((_, count) => <ShipCard key={`ship-placeholder-${count}`} loading />)}
        </Container>
        <span ref={infiniteScrollRef} />
      </Container>
    </>
  );
};
