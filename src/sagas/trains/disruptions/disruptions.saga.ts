import { takeLatest, all, call, put } from "redux-saga/effects";
import { DISRUPTIONS_ACTION_TYPES } from "./disruptions.types";
import {
  fetchDisruptionsSuccess,
  fetchDisruptionsFailed,
  getDisruptions,
} from "./disruptions.action";
import { routes } from "../../../routes/config";

export function* fetchDisruptionsAsync(): any {
  try {
    const departureArray = yield call(getDisruptions, { routes });
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

export function* trainsDisruptionsSaga() {
  yield all([call(onFetchDisruptions)]);
}
