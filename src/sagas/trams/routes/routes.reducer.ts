import { AnyAction } from "redux";
import { ROUTES_ACTION_TYPES, Routes } from "./routes.types";
import {
  fetchRoutesStart,
  fetchRoutesSuccess,
  fetchRoutesFailed,
} from "./routes.action";

export type RoutesState = {
  readonly routes: Routes[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const ROUTES_INITIAL_STATE = {
  routes: [],
  isLoading: false,
  error: null,
};

export const tramsRoutesReducer = (
  state = ROUTES_INITIAL_STATE,
  action: AnyAction
): RoutesState => {
  if (fetchRoutesStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchRoutesSuccess.match(action)) {
    return { ...state, routes: action.payload, isLoading: false };
  }
  if (fetchRoutesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }
  return state;
};
