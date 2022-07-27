import { AnyAction } from "redux";
import { DEPARTURES_ACTION_TYPES, Departures } from "./departures.types";
import {
  fetchDeparturesStart,
  fetchDeparturesSuccess,
  fetchDeparturesFailed,
} from "./departures.action";

export type DeparturesState = {
  readonly departures: Departures[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const DEPARTURES_INITIAL_STATE = {
  departures: [],
  isLoading: false,
  error: null,
};

export const trainsDeparturesReducer = (
  state = DEPARTURES_INITIAL_STATE,
  action: AnyAction
): DeparturesState => {
  if (fetchDeparturesStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchDeparturesSuccess.match(action)) {
    return { ...state, departures: action.payload, isLoading: false };
  }
  if (fetchDeparturesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }
  return state;
};
