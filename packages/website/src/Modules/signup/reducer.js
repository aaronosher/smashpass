import initialState from './initialState';
import { START_WAITING, STOP_WAITING } from './actions';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_WAITING:
      return {
        ...state,
        wait: true,
      };

    case STOP_WAITING:
      return {
        ...state,
        wait: false,
      };

    default:
      return { ...state };
  }
}

export default reducer;
