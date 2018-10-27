export const START_WAITING = '@@signup/START_WAITING';
export const STOP_WAITING = '@@signup/STOP_WAITING';
export const WAIT = '@@signup/WAIT';

export const startWaiting = () => ({ type: START_WAITING });
export const stopWaiting = () => ({ type: STOP_WAITING });

export const wait = () => (dispatch) => {
  dispatch(startWaiting());
  setTimeout(() => dispatch(stopWaiting()), 1000);
}
