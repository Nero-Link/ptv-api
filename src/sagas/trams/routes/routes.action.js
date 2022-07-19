import { createAction } from "../../../utils/reducer.utils";
import { ROUTES_ACTION_TYPES } from "./routes.types";
import { ptvClient } from "../../../utils/api.utils";

export const fetchRoutesStart = () =>
  createAction(ROUTES_ACTION_TYPES.FETCH_ROUTES_START);

export const fetchRoutesSuccess = (routes) =>
  createAction(ROUTES_ACTION_TYPES.FETCH_ROUTES_SUCCESS, routes);

export const fetchRoutesFailed = (error) =>
  createAction(ROUTES_ACTION_TYPES.FETCH_ROUTES_FAILED, error);

export const getRoutes = async (route) => {
  let stops = [];
  let counter = 0;
  await ptvClient
    .then((apis) => {
      return apis.Stops.Stops_StopsByGeolocation({
        route_types: 1,
        latitude: route.route.latitude,
        longitude: route.route.longitude,
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
