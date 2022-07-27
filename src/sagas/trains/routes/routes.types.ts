export enum ROUTES_ACTION_TYPES {
  FETCH_ROUTES_START = "trains/routes/FETCH_ROUTES_START",
  FETCH_ROUTES_SUCCESS = "trains/routes/FETCH_ROUTES_SUCCESS",
  FETCH_ROUTES_FAILED = "trains/routes/FETCH_ROUTES_FAILED",
}

export type Routes = {
  id: Number;
  count: Number;
  name: String;
  service: String;
};
