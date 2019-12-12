import * as signUpActions from './consts';
import api from '~/services/api';

const INITIAL_STATE = {
  token: '',
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case signUpActions.SIGN_UP_SUCCESS:
      return { token: action.payload.token };
    case signUpActions.SIGN_UP_FAIL:
      return INITIAL_STATE;
    case signUpActions.SIGN_OUT:
      return INITIAL_STATE;
    case signUpActions.REHYDRATE:
      if (action.payload && action.payload.auth.token !== '') {
        api.defaults.headers.common.Authorization = `Bearer ${action.payload.auth.token}`;
      }
      return state;
    default:
      return state;
  }
}
