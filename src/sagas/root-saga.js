import { all, call } from "redux-saga/effects";
import { routesSaga } from "./routes/routes.saga";
import { departuresSaga } from "./departures/departures.saga";
import { disruptionsSaga } from "./disruptions/disruptions.saga";

export function* rootSaga() {
  yield all([call(routesSaga), call(departuresSaga), call(disruptionsSaga)]);
}
