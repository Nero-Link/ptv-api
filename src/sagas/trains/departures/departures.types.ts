export enum DEPARTURES_ACTION_TYPES {
  FETCH_DEPARTURES_START = "trains/departures/FETCH_DEPARTURES_START",
  FETCH_DEPARTURES_SUCCESS = "trains/departures/FETCH_DEPARTURES_SUCCESS",
  FETCH_DEPARTURES_FAILED = "trains/departures/FETCH_DEPARTURES_FAILED",
}

export type Departures = {
  route_id: Number;
  departures: {
    count: number;
    time: string;
    fullTime: string;
    platform: string;
    disruptions: {
      id: [number];
    };
  };
};

export type DeparturesRaw = {
  at_platform: boolean;
  departure_sequence: number;
  direction_id: number;
  disruption_ids: [number];
  estimated_departure_utc: number;
  flags: string;
  platform_number: string;
  route_id: number;
  run_id: number;
  run_ref: string;
  scheduled_departure_utc: string;
  stop_id: number;
};
