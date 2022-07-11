import { takeLatest, all, call, put } from "redux-saga/effects";
import { ROUTES_ACTION_TYPES } from "./routes.types";
import { fetchRoutesSuccess, fetchRoutesFailed } from "./routes-action";
import ptvApi from "../../utils/api.utils";

export function* fetchRoutesAsync() {
  try {
    const routeArray = yield call(ptvApi, "routes");
    yield put(fetchRoutesSuccess(routeArray));
  } catch (error) {
    yield put(fetchRoutesFailed(error));
  }
}

export function* onFetchData() {
  yield takeLatest(ROUTES_ACTION_TYPES.fetchRoutesStart, fetchRoutesAsync);
}

export function* RoutesSaga() {
  yield all([call(onFetchData)]);
}
