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

export const getDisruptions = async (stops: {
  stops: Array<Number>;
}): Promise<Disruptions[]> => {
  let disruptions: Array<Disruptions> = [];
  await ptvClient
    .then((apis) => {
      return apis.Disruptions.Disruptions_GetAllDisruptions({
        route_types: 1,
      });
    })
    .then((res) => {
      res.body.disruptions.metro_tram.forEach((disruption: DisruptionsRaw) => {
        disruptions.push({
          title: disruption.title,
          routes: disruption.routes,
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
  return disruptions as Array<Disruptions>;
};
