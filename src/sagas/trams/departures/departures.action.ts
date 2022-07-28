import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../../utils/reducer.utils";
import {
  DEPARTURES_ACTION_TYPES,
  Departures,
  DeparturesRaw,
} from "./departures.types";
import { ptvClient } from "../../../utils/api.utils";

export type FetchDeparturesStart =
  Action<DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_START>;

export type FetchDeparturesSuccess = ActionWithPayload<
  DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_SUCCESS,
  Departures[]
>;

export type FetchDeparturesFailed = ActionWithPayload<
  DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_FAILED,
  Error
>;

export type DeparturesAction =
  | FetchDeparturesStart
  | FetchDeparturesSuccess
  | FetchDeparturesFailed;

export const fetchDeparturesStart = withMatcher(
  (): FetchDeparturesStart =>
    createAction(DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_START)
);

export const fetchDeparturesSuccess = withMatcher(
  (departures: Departures[]): FetchDeparturesSuccess =>
    createAction(DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_SUCCESS, departures)
);

export const fetchDeparturesFailed = withMatcher(
  (error: Error): FetchDeparturesFailed =>
    createAction(DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_FAILED, error)
);

const timeConvert = (departTime: string) => {
  let suffix = "AM";
  let hour = String(new Date(departTime).getHours()).padStart(2, "0");
  let minute = String(new Date(departTime).getMinutes()).padStart(2, "0");
  if (Number(hour) > 12) {
    suffix = "PM";
    hour = String(new Date(departTime).getHours() - 12).padStart(2, "0");
  }
  return hour + ":" + minute + suffix;
};

export const getDepartures = async (stops: {
  stops: Array<Number>;
}): Promise<Departures[]> => {
  let departures: Array<Departures> = [];
  await stops.stops.forEach((currStop) => {
    ptvClient
      .then((apis) => {
        return apis.Departures.Departures_GetForStop({
          stop_id: currStop,
          route_type: 1,
          max_results: 2,
        });
      })
      .then((res) => {
        let counter = 0;
        res.body.departures.forEach((departure: DeparturesRaw) => {
          let departTime;
          if (departure.estimated_departure_utc != null)
            departTime = departure.estimated_departure_utc;
          else departTime = departure.scheduled_departure_utc;
          if (
            new Date(departTime).getTime() >
            new Date().getTime() + 5 * 60000
          ) {
            counter++;
            departures.push({
              route_id: departure.route_id,
              departures: {
                count: counter,
                time: timeConvert(String(departTime)),
                fullTime: new Date(departTime).toLocaleString(),
                stop_id: departure.stop_id,
              },
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return departures as Array<Departures>;
};
