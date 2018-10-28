import { firestore } from 'firebase-admin';
const rp = require('request-promise-native');

const login = async (data: { email: string, smash: string }) => {
  const baseUrl = 'https://bigboy.smashpass.net';
  const aciton = '/login';
  const url = `${baseUrl}${aciton}`;

  const db = firestore();

  const users = await db.collection('users').where('email', '==', data.email)
    .get();

  if (users.size !== 1) {
    return {
      success: false,
      error: {
        code: 'failed',
        message: 'User does not exist',
      }
    };
  }

  const user = users.docs[0];

  const options = {
    method: 'POST',
    uri: url,
    body: {
      uid: user.id,
      smash: data.smash,
    },
    json: true,
  };
  
  const response = await rp(options);

  if (response.conf[0] > 0.5) {
    return {
      success: true,
      user: {
        firstName: user.data().first_name,
        lastName: user.data().last_name,
        email: user.data().email,
      }
    };
  } else {
    return {
      success: false,
      error: {
        code: 'failed',
        message: 'User did not match signature',
      }
    };
  }

};

export default login;
