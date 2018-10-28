import { Request, Response } from 'firebase-functions';
import { firestore } from 'firebase-admin';
const rp = require('request-promise-native');

const registerCallback = async (req: Request, res: Response) => {
  const data = req.body;

  const db = firestore();

  if (data.uid && (data.success === true || (data.success === false && !!data.error))) {
    const doc = db.doc(`users/${data.uid}`);
    try {
      await doc.update({ provisioned: true });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).send();
    }
  } else {
    return res.status(400).json({ error: 'invalid format' });
  }
};

export default registerCallback;
