import { createAction } from "../../utils/reducer.utils";
import { ROUTES_ACTION_TYPES } from "./routes.types";

export const fetchRoutesStart = () =>
  createAction(ROUTES_ACTION_TYPES.FETCH_ROUTES_START);

export const fetchRoutesSuccess = (routes) =>
  createAction(ROUTES_ACTION_TYPES.FETCH_ROUTES_SUCCESS, routes);

export const fetchRoutesFailed = (error) =>
  createAction(ROUTES_ACTION_TYPES.FETCH_ROUTES_FAILED, error);
