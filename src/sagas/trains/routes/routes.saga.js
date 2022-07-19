import { takeLatest, all, call, put } from "redux-saga/effects";
import { ROUTES_ACTION_TYPES } from "./routes.types";
import {
  fetchRoutesSuccess,
  fetchRoutesFailed,
  getRoutes,
} from "./routes.action";
import { route } from "../../routes/trains";

export function* fetchRoutesAsync() {
  try {
    const routeArray = yield call(getRoutes, { route });
    yield put(fetchRoutesSuccess(routeArray));
  } catch (error) {
    yield put(fetchRoutesFailed(error));
  }
}

export function* onFetchRoutes() {
  yield takeLatest(ROUTES_ACTION_TYPES.FETCH_ROUTES_START, fetchRoutesAsync);
}

export function* routesSaga() {
  yield all([call(onFetchRoutes)]);
}
