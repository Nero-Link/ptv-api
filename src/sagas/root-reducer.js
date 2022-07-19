import { combineReducers } from "redux";
import { trainsRoutesReducer } from "./trains/routes/routes.reducer";
import { trainsDeparturesReducer } from "./trains/departures/departures.reducer";
import { trainsDisruptionsReducer } from "./trains/disruptions/disruptions.reducer";
import { tramsRoutesReducer } from "./trams/routes/routes.reducer";
import { tramsDeparturesReducer } from "./trams/departures/departures.reducer";
import { tramsDisruptionsReducer } from "./trams/disruptions/disruptions.reducer";

export const rootReducer = combineReducers({
  trainsRoutes: trainsRoutesReducer,
  trainsDepartures: trainsDeparturesReducer,
  trainsDisruptions: trainsDisruptionsReducer,
  tramsRoutes: tramsRoutesReducer,
  tramsDepartures: tramsDeparturesReducer,
  tramsDisruptions: tramsDisruptionsReducer,
});
