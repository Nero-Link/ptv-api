export enum ROUTES_ACTION_TYPES {
  FETCH_ROUTES_START = "trams/routes/FETCH_ROUTES_START",
  FETCH_ROUTES_SUCCESS = "trams/routes/FETCH_ROUTES_SUCCESS",
  FETCH_ROUTES_FAILED = "trams/routes/FETCH_ROUTES_FAILED",
}

export type Stops = {
  id: Number;
  count: number;
  name: string;
  stop: string;
  routes: [Object];
  disruptions: [number];
};

export type StopsRaw = {
  disruption_ids: [number];
  route_type: number;
  routes: [Object];
  stop_distance: number;
  stop_id: number;
  stop_landmark: string;
  stop_latitude: number;
  stop_longitude: number;
  stop_name: string;
  stop_sequence: number;
  stop_suburb: string;
};
