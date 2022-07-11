import { takeLatest, all, call, put } from "redux-saga/effects";
import { DEPARTURES_ACTION_TYPES } from "./departures.types";
import {
  fetchDeparturesSuccess,
  fetchDeparturesFailed,
} from "./departures.action";
import { ptvApi } from "../../utils/api.utils";

export function* fetchDeparturesAsync() {
  try {
    const departureArray = yield call(ptvApi, "departures");
    yield put(fetchDeparturesSuccess(departureArray));
  } catch (error) {
    yield put(fetchDeparturesFailed(error));
  }
}

export function* onFetchData() {
  yield takeLatest(
    DEPARTURES_ACTION_TYPES.fetchDeparturesStart,
    fetchDeparturesAsync
  );
}

export function* departuresSaga() {
  yield all([call(onFetchData)]);
}
