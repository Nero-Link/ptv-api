import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
