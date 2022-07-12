import { createAction } from "../../utils/reducer.utils";
import { ROUTES_ACTION_TYPES } from "./routes.types";
import { ptvClient } from "../../utils/api.utils";
import { store } from "../store";

export const fetchRoutesStart = () =>
  createAction(ROUTES_ACTION_TYPES.FETCH_ROUTES_START);

export const fetchRoutesSuccess = (routes) =>
  createAction(ROUTES_ACTION_TYPES.FETCH_ROUTES_SUCCESS, routes);

export const fetchRoutesFailed = (error) =>
  createAction(ROUTES_ACTION_TYPES.FETCH_ROUTES_FAILED, error);

export const getRoutes = async (route) => {
  let routes = {
    id: [],
    name: [],
    service: [],
  };
  await route.route.forEach((currRoute) => {
    ptvClient
      .then((apis) => {
        return apis.Routes.Routes_RouteFromId({ route_id: currRoute });
      })
      .then((res) => {
        let service = res.body.route.route_service_status.description;
        let emoji = "🟢";
        if (service === "Good Service") {
          emoji = "🟢";
        } else if (service === "Minor Delays") {
          emoji = "🟡";
        } else if (service === "Major Delays") {
          emoji = "🔴";
        } else if (service === "Planned Works") {
          emoji = "🟠";
        }
        console.log(
          "Routes: " +
            res.body.route.route_name +
            " - " +
            emoji +
            " " +
            service +
            " " +
            emoji
        );
        routes.id.push(currRoute);
        routes.name.push(res.body.route.route_name);
        routes.service.push(res.body.route.route_service_status.description);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return routes;
};
