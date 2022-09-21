import { gql } from "@apollo/client";
import { Ship } from "../types";

export type GetShipsResult = {
  ships: Ship[];
};

export const GET_SHIPS = gql`
  query getShips($limit: Int, $offset: Int) {
    ships(limit: $limit, offset: $offset) {
      id
      image
      name
      model
    }
  }
`;
