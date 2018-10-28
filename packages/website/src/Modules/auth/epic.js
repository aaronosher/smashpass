import { combineEpics } from 'redux-observable';
import loginEpic from './epics/login';

const epic = combineEpics(
  loginEpic,
);

export default epic;
