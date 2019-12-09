import * as signUpActions from './consts';

const INITIAL_STATE = {
  token: '',
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case signUpActions.SIGN_UP_SUCCESS:
      return { token: action.payload.token };
    case signUpActions.SIGN_UP_FAIL:
      return INITIAL_STATE;
    default:
      return state;
  }
}
