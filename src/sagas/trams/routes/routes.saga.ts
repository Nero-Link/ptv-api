import { takeLatest, all, call, put } from "redux-saga/effects";
import { ROUTES_ACTION_TYPES } from "./routes.types";
import {
  fetchRoutesSuccess,
  fetchRoutesFailed,
  getRoutes,
} from "./routes.action";
import { location } from "../../../routes/config";

export function* fetchRoutesAsync() {
  try {
    const routeArray = yield call(getRoutes, { location });
    yield put(fetchRoutesSuccess(routeArray));
  } catch (error) {
    yield put(fetchRoutesFailed(error as Error));
  }
}

export function* onFetchRoutes() {
  yield takeLatest(ROUTES_ACTION_TYPES.FETCH_ROUTES_START, fetchRoutesAsync);
}

export function* tramsRoutesSaga() {
  yield all([call(onFetchRoutes)]);
}
