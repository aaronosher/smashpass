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
    return functions().httpsCallable('login')({ email, smash });
  }),
  map(res => {
    console.log(res);
    if (res.data.success) {
      return loginSuccess(res.data.user);
    } else {
      return loginFailure(res.data.error);
    }
  }),
  catchError(error => of(loginFailure({ message: error.message, code: error.code }))),
);

export default submitSignUpEpic;
