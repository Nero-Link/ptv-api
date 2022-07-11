import { createSelector } from "reselect";

const selectDisruptionsReducer = (state) => state.disruptions;

export const selectDisruptions = createSelector(
  [selectDisruptionsReducer],
  (disruptionsSlice) => disruptionsSlice.disruptions
);

export const selectDisruptionsMap = createSelector(
  [selectDisruptions],
  (disruptions) =>
    disruptions.reduce((acc, disruption) => {
      const { title, items } = disruption;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectDisruptionsIsLoading = createSelector(
  [selectDisruptionsReducer],
  (disruptionsSlice) => disruptionsSlice.isLoading
);
