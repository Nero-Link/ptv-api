import { createSelector } from "reselect";
import { RootState } from "../../store";
import { DisruptionsState } from "./disruptions.reducer";

const selectDisruptionsReducer = (state: RootState): DisruptionsState =>
  state.tramsDisruptions;

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
