import { createSelector } from "reselect";
import { RootState } from "../../store";
import { RoutesState } from "./routes.reducer";

const selectRoutesReducer = (state: RootState): RoutesState =>
  state.trainsRoutes;

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
