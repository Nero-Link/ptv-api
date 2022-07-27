import { all, call } from "redux-saga/effects";
import { trainsRoutesSaga } from "./trains/routes/routes.saga";
import { trainsDeparturesSaga } from "./trains/departures/departures.saga";
import { trainsDisruptionsSaga } from "./trains/disruptions/disruptions.saga";
import { tramsRoutesSaga } from "./trams/routes/routes.saga";
import { tramsDeparturesSaga } from "./trams/departures/departures.saga";
import { tramsDisruptionsSaga } from "./trams/disruptions/disruptions.saga";

export function* rootSaga() {
  yield all([
    call(trainsRoutesSaga),
    call(trainsDeparturesSaga),
    call(trainsDisruptionsSaga),
    call(tramsRoutesSaga),
    call(tramsDeparturesSaga),
    call(tramsDisruptionsSaga),
  ]);
}
