export enum DISRUPTIONS_ACTION_TYPES {
  FETCH_DISRUPTIONS_START = "trams/disruptions/FETCH_DISRUPTIONS_START",
  FETCH_DISRUPTIONS_SUCCESS = "trams/disruptions/FETCH_DISRUPTIONS_SUCCESS",
  FETCH_DISRUPTIONS_FAILED = "trams/disruptions/FETCH_DISRUPTIONS_FAILED",
}

export type Disruptions = {
  disruptions: [];
  isLoading: boolean;
  error: string;
};
