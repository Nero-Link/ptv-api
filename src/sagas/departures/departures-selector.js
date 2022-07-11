import { createSelector } from "reselect";

const selectDeparturesReducer = (state) => state.departures;

export const selectDepartures = createSelector(
  [selectDeparturesReducer],
  (departuresSlice) => departuresSlice.departures
);

export const selectDeparturesMap = createSelector(
  [selectDepartures],
  (departures) =>
    departures.reduce((acc, departure) => {
      const { title, items } = departure;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectDeparturesIsLoading = createSelector(
  [selectDeparturesReducer],
  (departuresSlice) => departuresSlice.isLoading
);
