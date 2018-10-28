import { authState } from 'rxfire/auth';
import { auth } from 'firebase';
import { map, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { GET_USER, updateUser } from '../actions';

const getUserEpic = action$ => action$.pipe(
  ofType(GET_USER),
  switchMap(() => authState(auth())),
  map(user => updateUser(user)),
);

export default getUserEpic;
