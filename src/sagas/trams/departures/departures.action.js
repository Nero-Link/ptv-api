import { createAction } from "../../../utils/reducer.utils";
import { DEPARTURES_ACTION_TYPES } from "./departures.types";
import { ptvClient } from "../../../utils/api.utils";

export const fetchDeparturesStart = () =>
  createAction(DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_START);

export const fetchDeparturesSuccess = (departures) =>
  createAction(DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_SUCCESS, departures);

export const fetchDeparturesFailed = (error) =>
  createAction(DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_FAILED, error);

const timeConvert = (departTime) => {
  let suffix = "AM";
  let hour = String(new Date(departTime).getHours()).padStart(2, "0");
  let minute = String(new Date(departTime).getMinutes()).padStart(2, "0");
  if (hour > 12) {
    suffix = "PM";
    hour = String(new Date(departTime).getHours() - 12).padStart(2, "0");
  }
  return hour + ":" + minute + suffix;
};

export const getDepartures = async (stops) => {
  let departures = [];
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
        res.body.departures.forEach((departure) => {
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
                time: timeConvert(departTime),
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
  return departures;
};
