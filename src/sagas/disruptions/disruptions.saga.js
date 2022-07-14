import { takeLatest, all, call, put } from "redux-saga/effects";
import { DISRUPTIONS_ACTION_TYPES } from "./disruptions.types";
import {
  fetchDisruptionsSuccess,
  fetchDisruptionsFailed,
  getDisruptions,
} from "./disruptions.action";
import { departuresMap } from "../../components/departures/departures.component";

export function* fetchDisruptionsAsync() {
  try {
    const departureArray = yield call(getDisruptions, { departuresMap });
    console.log(departuresMap.departures.disruptions);
    yield put(fetchDisruptionsSuccess(departureArray));
  } catch (error) {
    yield put(fetchDisruptionsFailed(error));
  }
}

export function* onFetchDisruptions() {
  yield takeLatest(
    DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_START,
    fetchDisruptionsAsync
  );
}

export function* disruptionsSaga() {
  yield all([call(onFetchDisruptions)]);
}
