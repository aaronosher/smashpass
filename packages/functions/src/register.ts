import { firestore, EventContext } from 'firebase-functions';
const rp = require('request-promise-native');

const register = async (document: firestore.DocumentSnapshot, event: EventContext) => {
  const baseUrl = 'https://bigboy.smashpass.net';
  const aciton = '/register';
  const url = `${baseUrl}${aciton}`;

  const docData = document.data();

  const data = {
    uid: document.id,
    smashes: docData.smashes,
  };

  const options = {
    method: 'POST',
    uri: url,
    body: data,
    json: true,
  };

  try {
    return await rp(options)
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default register;
