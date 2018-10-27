import { https } from 'firebase-functions';
import { initializeApp } from 'firebase-admin';

initializeApp();

import LoginFunction from './login';
import RegisterFunction from './register';

export const login = https.onRequest(LoginFunction);
export const register = https.onRequest(RegisterFunction);
