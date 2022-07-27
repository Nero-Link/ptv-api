import { takeLatest, all, call, put } from "typed-redux-saga/macro";
import { ROUTES_ACTION_TYPES } from "./routes.types";
import {
  fetchRoutesSuccess,
  fetchRoutesFailed,
  getRoutes,
} from "./routes.action";
import { routes } from "../../../routes/config";

export function* fetchRoutesAsync(): any {
  try {
    const routeArray = yield call(getRoutes, { routes });
    yield put(fetchRoutesSuccess(routeArray));
  } catch (error) {
    yield put(fetchRoutesFailed(error as Error));
  }
}

export function* onFetchRoutes() {
  yield takeLatest(ROUTES_ACTION_TYPES.FETCH_ROUTES_START, fetchRoutesAsync);
}

export function* trainsRoutesSaga() {
  yield all([call(onFetchRoutes)]);
}
