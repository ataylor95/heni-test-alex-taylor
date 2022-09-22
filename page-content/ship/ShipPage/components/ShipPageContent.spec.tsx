import { ShipPageContent } from ".";
import { render, screen } from "@testing-library/react";
import { DetailedShip } from "../../../../api/ship/types";

const baseProps: { ship: DetailedShip } = {
  ship: {
    id: "GOMSTREE",
    image: "https://i.imgur.com/MtEgYbY.jpg",
    name: "GO Ms Tree",
    model: "A model",
    active: true,
    status: "Out",
    type: "High Speed Craft",
    weight_kg: 449964,
    year_built: 2015,
    roles: [
      "Fairing Recovery",
      "Search and Destroy"
    ],
    home_port: "Port Canaveral",
    weight_lbs: 992000,
    successful_landings: 1,
    imo: 9744465,
    class: 15252765,
    abs: 1249191
  }
}

describe("Given the ShipPageContent component", () => {
  describe("For a ship with all information", () => {
    beforeEach(() => {
      render(<ShipPageContent {...baseProps} />);
    });
    test("It should show the name", () => {
      expect(screen.getByText(baseProps.ship.name)).toBeVisible();
    });
    test("It should show the id", () => {
      expect(screen.getByText(`Id: ${baseProps.ship.id}`)).toBeVisible();
    });
    test("It should show as active", () => {
      expect(screen.getByText("Active")).toBeVisible();
    });
    test("It should show a list of information", () => {
      expect(screen.getByText(baseProps.ship.type)).toBeVisible();
      if (baseProps.ship.model) {
        expect(screen.getByText(baseProps.ship.model)).toBeVisible();
      }
      if (baseProps.ship.status) {
        expect(screen.getByText(baseProps.ship.status)).toBeVisible();
      }
      if (baseProps.ship.successful_landings) {
        expect(screen.getByText(baseProps.ship.successful_landings)).toBeVisible();
      }
      expect(screen.getByText(baseProps.ship.year_built)).toBeVisible();
      expect(screen.getByText(baseProps.ship.home_port)).toBeVisible();
      expect(screen.getByText(baseProps.ship.weight_lbs)).toBeVisible();
      expect(screen.getByText(baseProps.ship.weight_kg)).toBeVisible();
      expect(screen.getByText(baseProps.ship.class)).toBeVisible();
      expect(screen.getByText(baseProps.ship.abs)).toBeVisible();
    });
  });
  describe("For a ship with lacking information", () => {
    beforeEach(() => {
      const ship = baseProps.ship;
      ship.active = false;
      ship.model = null;
      ship.status = null;
      ship.successful_landings = null;
      render(<ShipPageContent ship={ship} />);
    });
    test("It should show as Inactive", () => {
      expect(screen.getByText("Inactive")).toBeVisible();
    });
    test("It should No model if not model", () => {
      expect(screen.getByText("No model")).toBeVisible();
    });
    test("It should - if no status", () => {
      expect(screen.getByText("-")).toBeVisible();
    });
    // Bit vague on sleector, this and above could be improved
    test("It should 0 successful landing if no successful landings", () => {
      expect(screen.getByText("0")).toBeVisible();
    });
  });
});
