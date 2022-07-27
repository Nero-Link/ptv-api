import { createSelector } from "reselect";
import { RootState } from "../../store";
import { DeparturesState } from "./departures.reducer";

const selectDeparturesReducer = (state: RootState): DeparturesState =>
  state.trainsDepartures;

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
