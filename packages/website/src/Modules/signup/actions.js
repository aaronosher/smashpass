// import { getUser } from "../auth/actions";

export const START_WAITING = '@@signup/START_WAITING';
export const STOP_WAITING = '@@signup/STOP_WAITING';
export const WAIT = '@@signup/WAIT';
export const SUBMIT = '@@signup/SUBMIT';
export const SUBMIT_SUCCESS = '@@signup/SUBMIT_SUCCESS';
export const SUBMIT_FAILURE = '@@signup/SUBMIT_FAILURE';
export const ADD_SMASH = '@@signup/ADD_SMASH';

export const startWaiting = () => ({ type: START_WAITING });
export const stopWaiting = () => ({ type: STOP_WAITING });

export const wait = () => (dispatch) => {
  dispatch(startWaiting());
  setTimeout(() => dispatch(stopWaiting()), 600);
}

export const addSmash = smash => ({
  type: ADD_SMASH,
  payload: smash,
});

export const submit = signUp => {
  return ({
  type: SUBMIT,
  payload: signUp,
})};

export const submitSuccess = () => dispatch => {
  dispatch({
  type: SUBMIT_SUCCESS,
  })
  // dispatch(getUser());
};

export const submitFailure = () => ({
  type: SUBMIT_FAILURE,
});
