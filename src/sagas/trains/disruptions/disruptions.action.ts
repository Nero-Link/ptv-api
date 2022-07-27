import { createAction } from "../../../utils/reducer.utils";
import { DISRUPTIONS_ACTION_TYPES } from "./disruptions.types";
import { ptvClient } from "../../../utils/api.utils";

export const fetchDisruptionsStart = () =>
  createAction(DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_START);

export const fetchDisruptionsSuccess = (disruptions) =>
  createAction(DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_SUCCESS, disruptions);

export const fetchDisruptionsFailed = (error) =>
  createAction(DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_FAILED, error);

export const getDisruptions = async (routes) => {
  let disruptions = [];
  await routes.routes.forEach((currRoute) => {
    ptvClient
      .then((apis) => {
        return apis.Disruptions.Disruptions_GetDisruptionsByRoute({
          route_id: `${currRoute}`,
        });
      })
      .then((res) => {
        let counter = 0;
        res.body.disruptions.metro_train.forEach((disruption) => {
          if (
            !disruption.title.includes("Car") &&
            !disruption.title.includes("car") &&
            !disruption.title.includes("Vehicle") &&
            !disruption.title.includes("vehicle") &&
            !disruption.title.includes("pedestrian") &&
            !disruption.title.includes("Pedestrian") &&
            !disruption.title.includes("elevator") &&
            !disruption.title.includes("escalator")
          ) {
            counter++;
            disruptions.push({
              route_id: currRoute,
              disruptions: {
                id: disruption.disruption_id,
                count: counter,
                title: disruption.title,
              },
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return disruptions;
};
