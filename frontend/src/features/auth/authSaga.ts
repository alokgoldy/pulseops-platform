import { call, put, takeLatest } from 'redux-saga/effects';
import { apolloClient } from '../../app/apollo';
import { LOGIN_MUTATION } from './auth.graphql';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from './authSlice';

function* loginWorker(
  action: ReturnType<typeof loginRequest>
): Generator<any, void, any> {
  try {
    const { email, password } = action.payload;

    const response = yield call([apolloClient, apolloClient.mutate], {
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    });

    yield put(loginSuccess(response.data.login));
  } catch (err: any) {
    yield put(loginFailure(err.message || 'Login failed'));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginWorker);
}
