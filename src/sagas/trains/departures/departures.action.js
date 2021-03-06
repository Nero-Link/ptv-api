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

export const getDepartures = async (routes) => {
  let departures = [];
  await routes.routes.forEach((currRoute) => {
    ptvClient
      .then((apis) => {
        return apis.Departures.Departures_GetForStopAndRoute({
          route_id: currRoute,
          route_type: 0,
          stop_id: 1181,
          max_results: 10,
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
            departure.direction_id !== 1 &&
            new Date(departTime).getTime() > new Date().getTime() + 10 * 60000
          ) {
            counter++;
            if (counter < 6) {
              departures.push({
                route_id: currRoute,
                departures: {
                  count: counter,
                  time: timeConvert(departTime),
                  fullTime: new Date(departTime).toLocaleString(),
                  platform: departure.platform_number,
                  disruptions: {
                    id: departure.disruption_ids,
                  },
                },
              });
            }
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return departures;
};
