import { all, call } from "redux-saga/effects";
import { routesSaga } from "./trains/routes/routes.saga";
import { departuresSaga } from "./trains/departures/departures.saga";
import { disruptionsSaga } from "./trains/disruptions/disruptions.saga";

export function* rootSaga() {
  yield all([call(routesSaga), call(departuresSaga), call(disruptionsSaga)]);
}
