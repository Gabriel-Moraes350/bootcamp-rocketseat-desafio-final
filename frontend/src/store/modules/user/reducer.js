import * as signUpActions from '../auth/consts';

const INITIAL_STATE = {};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case signUpActions.SIGN_UP_SUCCESS:
      return action.payload.user;
    case signUpActions.SIGN_UP_FAIL:
      return INITIAL_STATE;
    default:
      return state;
  }
}
