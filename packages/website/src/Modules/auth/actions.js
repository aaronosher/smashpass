import { push } from "connected-react-router";

export const LOGIN = '@@auth/LOGIN';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCES';
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';

export const login = (email, smash) => ({ type: LOGIN, payload: { email, smash } });
export const loginSuccess = user => dispatch => {
  dispatch({ type: LOGIN_SUCCESS, payload: user });
  dispatch(push('/welcome'));
};
export const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error });
