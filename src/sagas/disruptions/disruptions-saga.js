import { takeLatest, all, call, put } from "redux-saga/effects";
import { DISRUPTIONS_ACTION_TYPES } from "./disruptions-types";
import {
  fetchDisruptionsSuccess,
  fetchDisruptionsFailed,
} from "./disruptions-action";
import ptvApi from "../../utils/api.utils";

export function* fetchDisruptionsAsync() {
  try {
    const departureArray = yield call(ptvApi, "disruptions");
    yield put(fetchDisruptionsSuccess(departureArray));
  } catch (error) {
    yield put(fetchDisruptionsFailed(error));
  }
}

export function* onFetchData() {
  yield takeLatest(
    DISRUPTIONS_ACTION_TYPES.fetchDisruptionsStart,
    fetchDisruptionsAsync
  );
}

export function* DisruptionsSaga() {
  yield all([call(onFetchData)]);
}
