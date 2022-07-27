import { AnyAction } from "redux";
import { DISRUPTIONS_ACTION_TYPES, Disruptions } from "./disruptions.types";
import {
  fetchDisruptionsStart,
  fetchDisruptionsSuccess,
  fetchDisruptionsFailed,
} from "./disruptions.action";

export type DisruptionsState = {
  readonly disruptions: Disruptions[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const DISRUPTIONS_INITIAL_STATE = {
  disruptions: [],
  isLoading: false,
  error: null,
};

export const trainsDisruptionsReducer = (
  state = DISRUPTIONS_INITIAL_STATE,
  action: AnyAction
): DisruptionsState => {
  if (fetchDisruptionsStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchDisruptionsSuccess.match(action)) {
    return { ...state, disruptions: action.payload, isLoading: false };
  }
  if (fetchDisruptionsFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }
  return state;
};
