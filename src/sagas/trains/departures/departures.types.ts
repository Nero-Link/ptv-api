export enum DEPARTURES_ACTION_TYPES {
  FETCH_DEPARTURES_START = "trains/departures/FETCH_DEPARTURES_START",
  FETCH_DEPARTURES_SUCCESS = "trains/departures/FETCH_DEPARTURES_SUCCESS",
  FETCH_DEPARTURES_FAILED = "trains/departures/FETCH_DEPARTURES_FAILED",
}

export type Departures = {
  departures: [];
  isLoading: boolean;
  error: string;
};
