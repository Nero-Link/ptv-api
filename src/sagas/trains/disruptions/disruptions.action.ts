import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../../utils/reducer.utils";
import {
  DISRUPTIONS_ACTION_TYPES,
  Disruptions,
  DisruptionsRaw,
} from "./disruptions.types";
import { ptvClient } from "../../../utils/api.utils";

export type FetchDisruptionsStart =
  Action<DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_START>;

export type FetchDisruptionsSuccess = ActionWithPayload<
  DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_SUCCESS,
  Disruptions[]
>;

export type FetchDisruptionsFailed = ActionWithPayload<
  DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_FAILED,
  Error
>;

export type DisruptionsAction =
  | FetchDisruptionsStart
  | FetchDisruptionsSuccess
  | FetchDisruptionsFailed;

export const fetchDisruptionsStart = withMatcher(
  (): FetchDisruptionsStart =>
    createAction(DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_START)
);

export const fetchDisruptionsSuccess = withMatcher(
  (disruptions: Disruptions[]): FetchDisruptionsSuccess =>
    createAction(
      DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_SUCCESS,
      disruptions
    )
);

export const fetchDisruptionsFailed = withMatcher(
  (error: Error): FetchDisruptionsFailed =>
    createAction(DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_FAILED, error)
);

export const getDisruptions = async (routes: { routes: Array<Number> }) => {
  let disruptions: Array<Disruptions> = [];
  await routes.routes.forEach((currRoute: Number) => {
    ptvClient
      .then((apis) => {
        return apis.Disruptions.Disruptions_GetDisruptionsByRoute({
          route_id: `${currRoute}`,
        });
      })
      .then((res) => {
        let counter = 0;
        res.body.disruptions.metro_train.forEach(
          (disruption: DisruptionsRaw) => {
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
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return disruptions as Array<Disruptions>;
};
