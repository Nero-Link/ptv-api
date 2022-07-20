import { createAction } from "../../../utils/reducer.utils";
import { DISRUPTIONS_ACTION_TYPES } from "./disruptions.types";
import { ptvClient } from "../../../utils/api.utils";

export const fetchDisruptionsStart = () =>
  createAction(DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_START);

export const fetchDisruptionsSuccess = (disruptions) =>
  createAction(DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_SUCCESS, disruptions);

export const fetchDisruptionsFailed = (error) =>
  createAction(DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_FAILED, error);

export const getDisruptions = async (stops) => {
  let disruptions = [];
  await ptvClient
    .then((apis) => {
      return apis.Disruptions.Disruptions_GetAllDisruptions({
        route_types: 1,
      });
    })
    .then((res) => {
      res.body.disruptions.metro_tram.forEach((disruption) => {
        disruptions.push({
          title: disruption.title,
          routes: disruption.routes,
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
  return disruptions;
};
