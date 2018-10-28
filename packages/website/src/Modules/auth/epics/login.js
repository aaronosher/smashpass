import { functions } from 'firebase';

import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { LOGIN, loginSuccess, loginFailure } from '../actions';

const submitSignUpEpic = action$ => action$.pipe(
  ofType(LOGIN),
  tap(action => console.log(action)),
  switchMap(action => {
    const { email, smash } = action.payload;
    return functions().httpsCallable('login')(email, smash);
  }),
  map(result => {
    if (result.successfull) {
      return loginSuccess(result.user);
    } else {
      return loginFailure(result.error);
    }
  }),
  catchError(error => of(loginFailure({ message: error.message, code: error.code }))),
);

export default submitSignUpEpic;
