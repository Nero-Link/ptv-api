export enum DISRUPTIONS_ACTION_TYPES {
  FETCH_DISRUPTIONS_START = "trains/disruptions/FETCH_DISRUPTIONS_START",
  FETCH_DISRUPTIONS_SUCCESS = "trains/disruptions/FETCH_DISRUPTIONS_SUCCESS",
  FETCH_DISRUPTIONS_FAILED = "trains/disruptions/FETCH_DISRUPTIONS_FAILED",
}

export type Disruptions = {
  disruptions: [];
  isLoading: boolean;
  error: string;
};
