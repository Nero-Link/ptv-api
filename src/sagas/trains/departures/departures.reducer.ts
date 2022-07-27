import { DEPARTURES_ACTION_TYPES } from "./departures.types";

export const DEPARTURES_INITIAL_STATE = {
  departures: [],
  isLoading: false,
  error: null,
};

export const trainsDeparturesReducer = (
  state = DEPARTURES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_START:
      return { ...state, isLoading: true };
    case DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_SUCCESS:
      return { ...state, departures: payload, isLoading: false };
    case DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
