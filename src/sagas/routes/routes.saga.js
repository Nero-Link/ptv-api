import { takeLatest, all, call, put } from "redux-saga/effects";
import { ROUTES_ACTION_TYPES } from "./routes.types";
import { fetchRoutesSuccess, fetchRoutesFailed } from "./routes.action";
import { getRoutes } from "./routes.action";
import { route } from "../../App";

export function* fetchRoutesAsync() {
  try {
    const routeArray = yield call(getRoutes, { route });
    yield put(fetchRoutesSuccess(routeArray));
  } catch (error) {
    yield put(fetchRoutesFailed(error));
  }
}

export function* onFetchData() {
  yield takeLatest(ROUTES_ACTION_TYPES.FETCH_ROUTES_START, fetchRoutesAsync);
}

export function* routesSaga() {
  yield all([call(onFetchData)]);
}
