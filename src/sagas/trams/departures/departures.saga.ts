import { takeLatest, all, call, put } from "redux-saga/effects";
import { DEPARTURES_ACTION_TYPES } from "./departures.types";
import {
  fetchDeparturesSuccess,
  fetchDeparturesFailed,
  getDepartures,
} from "./departures.action";
import { stops } from "../../../routes/config";

export function* fetchDeparturesAsync(): any {
  try {
    const departureArray = yield call(getDepartures, { stops });
    yield put(fetchDeparturesSuccess(departureArray));
  } catch (error) {
    yield put(fetchDeparturesFailed(error as Error));
  }
}

export function* onFetchDepartures() {
  yield takeLatest(
    DEPARTURES_ACTION_TYPES.FETCH_DEPARTURES_START,
    fetchDeparturesAsync
  );
}

export function* tramsDeparturesSaga() {
  yield all([call(onFetchDepartures)]);
}
