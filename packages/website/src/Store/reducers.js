import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

const makeRootReducer = asyncReducers => combineReducers({
  // Add sync reducers here
  form,
  ...asyncReducers,
});

/* eslint-disable no-param-reassign */
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};
/* eslint-enable */

export default makeRootReducer;
