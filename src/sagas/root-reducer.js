import { combineReducers } from "redux";
import { routesReducer } from "./trains/routes/routes.reducer";
import { departuresReducer } from "./trains/departures/departures.reducer";
import { disruptionsReducer } from "./trains/disruptions/disruptions.reducer";

export const rootReducer = combineReducers({
  routes: routesReducer,
  departures: departuresReducer,
  disruptions: disruptionsReducer,
});
