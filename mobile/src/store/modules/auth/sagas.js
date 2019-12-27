import { all, takeLatest, call, put } from 'redux-saga/effects';
import Config from 'react-native-config';
import { Alert } from 'react-native';
import { signUpSuccess, signUpFail } from './actions';
import * as signUpActions from './consts';
import api from '~/services/api';

function* signUp({ payload }) {
  const { id } = payload;

  try {
    yield call(api.get, `/${id}/login`);

    yield put(signUpSuccess(id));

    // attach authorization header when user does login
    api.defaults.baseURL = `${Config.API_URL}/${id}`;
  } catch (error) {
    Alert.alert('Falha na autenticação', 'Estudante não encontrado');
    yield put(signUpFail());
  }
}

export default all([takeLatest(signUpActions.SIGN_UP_REQUEST, signUp)]);
