import initialState from './initialState';
import { START_WAITING, STOP_WAITING, ADD_SMASH, SUBMIT_SUCCESS } from './actions';

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

    case SUBMIT_SUCCESS:
      return {
        ...state,
        newUser: action.payload,
      }

    case ADD_SMASH:
      const smashes = state.smashes;
      smashes.push(action.payload);
      return {
        ...state,
        smashes,
      };

    default:
      return { ...state };
  }
}

export default reducer;
