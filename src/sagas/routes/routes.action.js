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
  try {
    await route.route.forEach((currRoute) =>
      ptvClient
        .then((apis) => {
          return apis.Routes.Routes_RouteFromId({ route_id: currRoute });
        })
        .then((res) => {
          route = res.body.route.route_name;
          let service = res.body.route.route_service_status.description;
          let emoji = "🟢";
          if (service === "Good Service") {
            emoji = "🟢";
          } else if (service === "Minor Delays") {
            emoji = "🟡";
          } else if (
            service === "Major Delays" ||
            service === "Planned Works"
          ) {
            emoji = "🔴";
          }
          console.log(
            "Routes: " + route + " - " + emoji + " " + service + " " + emoji
          );
        })
    );
  } catch (error) {
    console.log(error);
  }
};
