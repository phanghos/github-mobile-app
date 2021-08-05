import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';

const l18nSlice = createSlice({
  name: 'l18n',
  initialState: {
    locale: 'en',
  },
  reducers: {},
});

export const l18nActions = l18nSlice.actions;

const getRootReducer = () =>
  combineReducers({
    l18n: l18nSlice.reducer,
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
