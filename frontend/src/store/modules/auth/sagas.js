import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { signUpSuccess, signUpFail } from './actions';
import * as signUpActions from './consts';
import api from '~/services/api';
import history from '~/services/history';

function* signUp({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, '/login', { email, password });

    const { access_token: token, user } = response.data;

    yield put(signUpSuccess(token, user));

    // attach authorization header when user does login
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    history.push('/students');
  } catch (error) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signUpFail());
  }
}

export default all([takeLatest(signUpActions.SIGN_UP_REQUEST, signUp)]);
