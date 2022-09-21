export interface Ship {
  id: string;
  image: string;
  name: string;
  model: string | null;
}

export interface DetailedShip extends Ship {
  active: boolean;
  status: string;
  type: string;
  weight_kg: number;
  year_built: number;
  roles: string[];
  home_port: string;
  weight_lbs: number;
  successful_landings: number | null;
  imo: number;
  class: number;
  abs: number;
}
