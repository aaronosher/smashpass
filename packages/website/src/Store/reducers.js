import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import signUp from '../Modules/signup';
import auth from '../Modules/auth';

const makeRootReducer = asyncReducers => combineReducers({
  // Add sync reducers here
  form,
  signUp,
  auth,
  ...asyncReducers,
});

/* eslint-disable no-param-reassign */
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};
/* eslint-enable */

export default makeRootReducer;
