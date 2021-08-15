import { call, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { ApiService } from '@services/api';
import { authActions } from './auth.reducer';

function* login() {
  try {
    const { data: user }: SagaReturnType<typeof ApiService.login> = yield call(
      ApiService.login,
    );
    yield put(authActions.setLoggedUser(user));
  } catch (error) {
    // Do nothing
  }
}

export function* authSaga() {
  yield takeEvery(authActions.setIsLoading, login);
}
