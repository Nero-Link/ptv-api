import { createSelector } from "reselect";

const selectRoutesReducer = (state) => state.routes;

export const selectRoutes = createSelector(
  [selectRoutesReducer],
  (routesSlice) => routesSlice.routes
);

export const selectRoutesMap = createSelector([selectRoutes], (routes) =>
  routes.reduce((acc, route) => {
    const { title, items } = route;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);

export const selectRoutesIsLoading = createSelector(
  [selectRoutesReducer],
  (routesSlice) => routesSlice.isLoading
);
