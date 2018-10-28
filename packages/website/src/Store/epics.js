import { combineEpics } from 'redux-observable';
import signupEpic from '../Modules/signup/epic';
import authEpic from '../Modules/auth/epic';

const rootEpic = combineEpics(
  signupEpic,
  authEpic,
);

export default rootEpic;
