import { createSelector } from "reselect";

const selectDisruptionsReducer = (state) => state.tramsDisruptions;

export const selectDisruptions = createSelector(
  [selectDisruptionsReducer],
  (disruptions) => disruptions.disruptions
);

export const selectDisruptionsMap = createSelector(
  [selectDisruptions],
  (disruptions) => disruptions
);

export const selectDisruptionsIsLoading = createSelector(
  [selectDisruptionsReducer],
  (disruptions) => disruptions.isLoading
);
