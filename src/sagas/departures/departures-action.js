import { createAction } from "../../utils/reducer.utils";
import { DEPARTURES_ACTION_TYPES } from "./departures-types";

export const fetchDeparturesStart = () =>
  createAction(DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_START);

export const fetchDeparturesSuccess = (departures) =>
  createAction(DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_SUCCESS, departures);

export const fetchDeparturesFailed = (error) =>
  createAction(DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_FAILED, error);
