export const CREATE_USER = '@@auth/CREATE_USER';
export const UPDATE_USER = '@@auth/UPDATE_USER';
export const CREATE_USER_SUCCESS = '@@auth/CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = '@@auth/CREATE_USER_FAILURE';
export const GET_USER = '@@auth/GET_USER';

export const createUser = (email, name) => dispatch => {
  dispatch({
    type: CREATE_USER,
    payload: {
      email,
      name,
    }
  });
  dispatch(getUser)
};

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const createUserSuccess = () => dispatch => {
  dispatch({
    type: CREATE_USER_SUCCESS,
  });
  dispatch({
    type: GET_USER,
  });
};

export const createUserFailure = error => ({ 
  type: CREATE_USER_FAILURE,
  payload: error,
});

export const getUser = () => ({
  type: GET_USER,
});
