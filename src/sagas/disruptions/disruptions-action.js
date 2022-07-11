import { createAction } from "../../utils/reducer.utils";
import { DISRUPTIONS_ACTION_TYPES } from "./disruptions-types";

export const fetchDisruptionsStart = () =>
  createAction(DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_START);

export const fetchDisruptionsSuccess = (disruptions) =>
  createAction(DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_SUCCESS, disruptions);

export const fetchDisruptionsFailed = (error) =>
  createAction(DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_FAILED, error);
