import { createSelector } from "reselect";

const selectDeparturesReducer = (state) => state.trainsDepartures;

export const selectDepartures = createSelector(
  [selectDeparturesReducer],
  (departures) => departures.departures
);

export const selectDeparturesMap = createSelector(
  [selectDepartures],
  (departures) => departures
);

export const selectDeparturesIsLoading = createSelector(
  [selectDeparturesReducer],
  (departuresSlice) => departuresSlice.isLoading
);
