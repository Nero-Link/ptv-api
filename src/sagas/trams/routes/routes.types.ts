export enum ROUTES_ACTION_TYPES {
  FETCH_ROUTES_START = "trams/routes/FETCH_ROUTES_START",
  FETCH_ROUTES_SUCCESS = "trams/routes/FETCH_ROUTES_SUCCESS",
  FETCH_ROUTES_FAILED = "trams/routes/FETCH_ROUTES_FAILED",
}

export type Routes = {
  id: Number;
  count: Number;
  name: String;
  service: String;
};
