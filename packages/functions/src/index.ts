import { https, firestore } from 'firebase-functions';
import { initializeApp } from 'firebase-admin';

initializeApp();

import LoginFunction from './login';
import RegisterFunction from './register';
import RegisterCallbackFunction from './registerCallback';

export const login = https.onRequest(LoginFunction);
export const onRegister = firestore.document('users/{userId}').onCreate(RegisterFunction);
export const registerCallback = https.onRequest(RegisterCallbackFunction);
