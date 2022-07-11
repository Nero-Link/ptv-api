import { DISRUPTIONS_ACTION_TYPES } from "./disruptions.types";

export const DISRUPTIONS_INITIAL_STATE = {
  disruptions: [],
  isLoading: false,
  error: null,
};

export const disruptionsReducer = (
  state = DISRUPTIONS_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_START:
      return { ...state, isLoading: true };
    case DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_SUCCESS:
      return { ...state, disruptions: payload, isLoading: false };
    case DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
