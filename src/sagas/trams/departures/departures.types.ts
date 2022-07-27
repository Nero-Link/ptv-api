export enum DEPARTURES_ACTION_TYPES {
  FETCH_DEPARTURES_START = "trams/departures/FETCH_DEPARTURES_START",
  FETCH_DEPARTURES_SUCCESS = "trams/departures/FETCH_DEPARTURES_SUCCESS",
  FETCH_DEPARTURES_FAILED = "trams/departures/FETCH_DEPARTURES_FAILED",
}

export type Departures = {
  departures: [];
  isLoading: boolean;
  error: string;
};
