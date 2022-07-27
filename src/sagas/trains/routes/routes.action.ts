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

export const getRoutes = async (route: {
  routes: Array<Number>;
}): Promise<Routes[]> => {
  let routes: Array<Routes> = [];
  let counter = 0;
  await route.routes.forEach((currRoute: Number) => {
    ptvClient
      .then((apis) => {
        return apis.Routes.Routes_RouteFromId({ route_id: currRoute });
      })
      .then((res) => {
        counter++;
        routes.push({
          id: currRoute,
          count: counter,
          name: res.body.route.route_name,
          service: res.body.route.route_service_status.description,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return routes as Array<Routes>;
};
