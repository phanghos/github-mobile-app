import { createSelector } from 'reselect';
import { RootState } from 'store';

const getAuth = (state: RootState) => state.auth;

export const isUserLoggingInSelector = createSelector(
  getAuth,
  auth => auth.isLoading,
);

export const userSelector = createSelector(getAuth, auth => auth.user);
