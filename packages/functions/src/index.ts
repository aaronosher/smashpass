import { https, runWith } from 'firebase-functions';
import { initializeApp } from 'firebase-admin';

initializeApp();

const runtimeOpts = {
  timeoutSeconds: 300,
}

import LoginFunction from './login';
import RegisterFunction from './register';
import RegisterCallbackFunction from './registerCallback';

export const login = https.onRequest(LoginFunction);
export const register = runWith(runtimeOpts).https.onRequest(RegisterFunction);
export const registerCallback = https.onRequest(RegisterCallbackFunction);
