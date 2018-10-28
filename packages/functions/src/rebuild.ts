import { Request, Response } from 'firebase-functions';
import { firestore } from 'firebase-admin';
const rp = require('request-promise-native');

const rebuild = async (req: Request, res: Response) => {
  const baseUrl = 'https://bigboy.smashpass.net';
  const aciton = '/register';
  const url = `${baseUrl}${aciton}`;

  const uid = req.query.uid;

  const db = firestore();

  const doc = await db.doc(`users/${uid}`).get();

  if (!doc.exists) {
    return res.status(404).send('Not found');
  }

  const data = doc.data();

  const options = {
    method: 'POST',
    uri: url,
    body: {
      uid,
      smashes: data.smashes,
    },
    json: true,
  };

  try {
    await rp(options);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default rebuild;
