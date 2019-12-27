import produce from 'immer';
import Config from 'react-native-config';
import * as signUpActions from './consts';
import api from '~/services/api';

const INITIAL_STATE = {
  id: '',
  signed: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case signUpActions.SIGN_UP_SUCCESS:
        draft.id = action.payload.id;
        draft.signed = true;
        break;
      case signUpActions.SIGN_UP_FAIL:
        draft.id = '';
        draft.signed = false;
        break;
      case signUpActions.SIGN_OUT:
        draft.id = '';
        draft.signed = false;
        api.defaults.baseURL = Config.API_URL;
        break;
      case signUpActions.REHYDRATE:
        if (action.payload && action.payload.auth.signed) {
          const { id } = action.payload.auth;
          draft.id = id;
          draft.signed = true;
          api.defaults.baseURL = `${Config.API_URL}/${id}`;
        }
        break;
      default:
    }
  });
}
