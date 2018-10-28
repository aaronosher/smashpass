import initialState from './intialState';
import { UPDATE_USER, CREATE_USER_FAILURE } from './actions';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case CREATE_USER_FAILURE: 
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default reducer;
