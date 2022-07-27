import { takeLatest, all, call, put } from "redux-saga/effects";
import { DISRUPTIONS_ACTION_TYPES } from "./disruptions.types";
import {
  fetchDisruptionsSuccess,
  fetchDisruptionsFailed,
  getDisruptions,
} from "./disruptions.action";
import { stops } from "../../../routes/config";

export function* fetchDisruptionsAsync() {
  try {
    const departureArray = yield call(getDisruptions, { stops });
    yield put(fetchDisruptionsSuccess(departureArray));
  } catch (error) {
    yield put(fetchDisruptionsFailed(error as Error));
  }
}

export function* onFetchDisruptions() {
  yield takeLatest(
    DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_START,
    fetchDisruptionsAsync
  );
}

export function* tramsDisruptionsSaga() {
  yield all([call(onFetchDisruptions)]);
}
