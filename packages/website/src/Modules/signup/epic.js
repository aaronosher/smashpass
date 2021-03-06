import { combineEpics } from 'redux-observable';
import submitEpic from './epics/submit';

const epic = combineEpics(
  submitEpic,
);

export default epic;
