import { combineEpics } from 'redux-observable';
import getUserEpic from './epics/getUser';

const epic = combineEpics(
  getUserEpic,
);

export default epic;
