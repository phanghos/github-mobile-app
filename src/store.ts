import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { l18nReducer } from '@features/l18n/l18n.reducer';
import { authReducer } from '@features/auth/auth.reducer';
import { authSaga } from '@features/auth/auth.saga';

const getRootReducer = () =>
  combineReducers({
    l18n: l18nReducer,
    auth: authReducer,
  });

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: getRootReducer(),
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware();
    middlewares.push(sagaMiddleware);

    if (__DEV__) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }

    return middlewares;
  },
});

sagaMiddleware.run(authSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
