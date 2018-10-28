import { doc } from 'rxfire/firestore'; 
import { auth, firestore}  from 'firebase';

import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, switchMap, catchError, take } from 'rxjs/operators';

import { SUBMIT, submitSuccess, submitFailure } from '../actions';

const submitSignUpEpic = action$ => action$.pipe(
  ofType(SUBMIT),
  map(action => {
    auth().createUserWithEmailAndPassword(
      action.payload.email,
      'asdfjalskfjf209fjklfjsvnf2-04fnafadf'
    );
    return action;
  }),
  switchMap(action => {
    const db = firestore();
    const document = db.doc(`users/${action.payload.first_name}${action.payload.last_name}`);
    document.set(action.payload);
    return doc(document);
  }),
  take(2),
  map((document) => {
    if (document.exists) {
      return submitSuccess(document.data());
    }
    return submitFailure({ code: 'error' });
  }),
  catchError(error => {
    console.error(error);
    return of(submitFailure(error))
  }),
);

export default submitSignUpEpic;
