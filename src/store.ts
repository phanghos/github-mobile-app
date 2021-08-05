import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { l18nReducer } from '@features/l18n/l18n.reducer';

const getRootReducer = () =>
  combineReducers({
    l18n: l18nReducer,
  });

export const store = configureStore({
  reducer: getRootReducer(),
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware();

    if (__DEV__) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }

    return middlewares;
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
