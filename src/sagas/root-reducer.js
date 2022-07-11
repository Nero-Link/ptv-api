import { combineReducers } from "redux";
import { routesReducer } from "./routes/routes.reducer";
import { departuresReducer } from "./departures/depatures.reducer";
import { disruptionsReducer } from "./disruptions/disruptions.reducer";

export const rootReducer = combineReducers({
  routes: routesReducer,
  departures: departuresReducer,
  disruptions: disruptionsReducer,
});
