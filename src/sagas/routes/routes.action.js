import { createAction } from "../../utils/reducer.utils";
import { ROUTES_ACTION_TYPES } from "./routes.types";
import { ptvClient } from "../../utils/api.utils";

export const fetchRoutesStart = () =>
  createAction(ROUTES_ACTION_TYPES.FETCH_ROUTES_START);

export const fetchRoutesSuccess = (routes) =>
  createAction(ROUTES_ACTION_TYPES.FETCH_ROUTES_SUCCESS, routes);

export const fetchRoutesFailed = (error) =>
  createAction(ROUTES_ACTION_TYPES.FETCH_ROUTES_FAILED, error);

export const getRoutes = async (route) => {
  let routes = [];
  await route.route.forEach((currRoute) => {
    ptvClient
      .then((apis) => {
        return apis.Routes.Routes_RouteFromId({ route_id: currRoute });
      })
      .then((res) => {
        routes.push({
          id: currRoute,
          name: res.body.route.route_name,
          service: res.body.route.route_service_status.description,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return routes;
};
