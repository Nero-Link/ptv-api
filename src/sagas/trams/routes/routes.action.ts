import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../../utils/reducer.utils";
import { ROUTES_ACTION_TYPES, Routes } from "./routes.types";
import { ptvClient } from "../../../utils/api.utils";

export type FetchRoutesStart = Action<ROUTES_ACTION_TYPES.FETCH_ROUTES_START>;

export type FetchRoutesSuccess = ActionWithPayload<
  ROUTES_ACTION_TYPES.FETCH_ROUTES_SUCCESS,
  Routes[]
>;

export type FetchRoutesFailed = ActionWithPayload<
  ROUTES_ACTION_TYPES.FETCH_ROUTES_FAILED,
  Error
>;

export type RoutesAction =
  | FetchRoutesStart
  | FetchRoutesSuccess
  | FetchRoutesFailed;

export const fetchRoutesStart = withMatcher(
  (): FetchRoutesStart => createAction(ROUTES_ACTION_TYPES.FETCH_ROUTES_START)
);

export const fetchRoutesSuccess = withMatcher(
  (routes: Routes[]): FetchRoutesSuccess =>
    createAction(ROUTES_ACTION_TYPES.FETCH_ROUTES_SUCCESS, routes)
);

export const fetchRoutesFailed = withMatcher(
  (error: Error): FetchRoutesFailed =>
    createAction(ROUTES_ACTION_TYPES.FETCH_ROUTES_FAILED, error)
);

export const getRoutes = async (location) => {
  let stops = [];
  let counter = 0;
  await ptvClient
    .then((apis) => {
      return apis.Stops.Stops_StopsByGeolocation({
        route_types: 1,
        latitude: location.location.latitude,
        longitude: location.location.longitude,
        max_results: 5,
      });
    })
    .then((res) => {
      res.body.stops.forEach((stop) => {
        let stopName = stop.stop_name;
        let stopId = stop.stop_name;
        stopName = stopName.substring(0, stopName.indexOf(" #"));
        stopId = stopId.substring(stopId.indexOf("#"));
        counter++;
        stops.push({
          id: stop.stop_id,
          count: counter,
          name: stopName,
          stop: stopId.substring(1),
          routes: stop.routes,
          disruptions: stop.disruption_ids,
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
  return stops;
};
