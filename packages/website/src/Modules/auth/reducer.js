import initialState from './intialState';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from './actions';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default reducer;
