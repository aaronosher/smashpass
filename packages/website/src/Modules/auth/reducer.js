import initialState from './intialState';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from './actions';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggingIn: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loggingIn: false,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
        loggingIn: false,
      };

    default:
      return state;
  }
}

export default reducer;
