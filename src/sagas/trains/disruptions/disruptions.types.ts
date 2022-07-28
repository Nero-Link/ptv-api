export enum DISRUPTIONS_ACTION_TYPES {
  FETCH_DISRUPTIONS_START = "trains/disruptions/FETCH_DISRUPTIONS_START",
  FETCH_DISRUPTIONS_SUCCESS = "trains/disruptions/FETCH_DISRUPTIONS_SUCCESS",
  FETCH_DISRUPTIONS_FAILED = "trains/disruptions/FETCH_DISRUPTIONS_FAILED",
}

export type Disruptions = {
  route_id: Number;
  disruptions: {
    id: number;
    count: number;
    title: string;
  };
};

export type DisruptionsRaw = {
  colour: string;
  description: string;
  display_on_board: boolean;
  display_status: boolean;
  disruption_id: number;
  disruption_status: string;
  disruption_type: string;
  from_date: string;
  last_updated: string;
  published_on: string;
  routes: [Object];
  stops: [Object];
  title: string;
  to_date: string;
  url: string;
};
