import { call, put, takeLatest } from 'redux-saga/effects';
import { client } from '../../app/apollo';
import { LOGIN_MUTATION } from './auth.graphql';
import type { User } from './auth.types';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from './authSlice';

function* loginWorker(
  action: ReturnType<typeof loginRequest>
): Generator<unknown, void, { data: { login: User } }> {
  try {
    const { email, password } = action.payload;

    const response = yield call([client, client.mutate], {
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    });

    yield put(loginSuccess(response.data.login));
  } catch (err: unknown) {
    if (err instanceof Error) {
      yield put(loginFailure(err.message));
    } else {
      yield put(loginFailure('An unknown error occurred'));
    }
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginWorker);
}
