import * as signUpActions from './consts';

export const signUp = (email, password) => {
  return {
    type: signUpActions.SIGN_UP_REQUEST,
    payload: {
      email,
      password,
    },
  };
};

export const signUpSuccess = (token, user) => {
  return {
    type: signUpActions.SIGN_UP_SUCCESS,
    payload: {
      token,
      user,
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
