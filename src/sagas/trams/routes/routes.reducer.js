import { ROUTES_ACTION_TYPES } from "./routes.types";

export const ROUTES_INITIAL_STATE = {
  routes: [],
  isLoading: false,
  error: null,
};

export const tramsRoutesReducer = (
  state = ROUTES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case ROUTES_ACTION_TYPES.FETCH_ROUTES_START:
      return { ...state, isLoading: true };
    case ROUTES_ACTION_TYPES.FETCH_ROUTES_SUCCESS:
      return { ...state, routes: payload, isLoading: false };
    case ROUTES_ACTION_TYPES.FETCH_ROUTES_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
