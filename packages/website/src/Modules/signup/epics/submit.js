import { doc } from 'rxfire/firestore';
import { authState } from 'rxfire/auth';
import { getFirebase } from 'react-redux-firebase';

import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { SUBMIT, submitSuccess, submitFailure } from '../actions';

const submitSignUpEpic = action$ => action$.pipe(
  ofType(SUBMIT),
  switchMap((action) => {
    const db = getFirebase().firestore();
    const document = db.doc(`users/${action.email}`);
    document.set(action.payload);
    return doc(document);
  }),
  catchError(error => of(submitFailure(error))),
  map((document) => {
    if (document.exists) {
      return submitSuccess(document.data());
    }
    return submitFailure({ code: 'not-found' });
  }),
);

export default submitSignUpEpic;
