import { createSelector } from "reselect";

const selectRoutesReducer = (state) => state.routes;

export const selectRoutes = createSelector(
  [selectRoutesReducer],
  (route) => route.routes
);

export const selectRoutesMap = createSelector(
  [selectRoutes],
  (routes) => routes
);

export const selectRoutesIsLoading = createSelector(
  [selectRoutesReducer],
  (routes) => routes.isLoading
);
