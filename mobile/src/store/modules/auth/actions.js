import * as signUpActions from './consts';

export const signUp = id => {
  return {
    type: signUpActions.SIGN_UP_REQUEST,
    payload: {
      id,
    },
  };
};

export const signUpSuccess = id => {
  return {
    type: signUpActions.SIGN_UP_SUCCESS,
    payload: {
      id,
    },
  };
};

export const signUpFail = () => {
  return {
    type: signUpActions.SIGN_UP_FAIL,
    payload: {},
  };
};

export const signOut = () => {
  return {
    type: signUpActions.SIGN_OUT,
    payload: {},
  };
};
