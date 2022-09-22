import { gql } from "@apollo/client";
import { Ship, DetailedShip } from "../types";

export type GetShipsResult<T extends Ship | DetailedShip> = {
  ships: T[];
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

export const GET_SHIP = gql`
  query getShip($id: ID!) {
    ships(find: { id: $id }) {
      id
      image
      name
      model
      active
      status
      type
      weight_kg
      year_built
      roles
      home_port
      weight_lbs
      successful_landings
      imo
      class
      abs
    }
  }
`;
