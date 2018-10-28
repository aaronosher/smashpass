import { Request, Response } from 'firebase-functions';
const rp = require('request-promise-native');

const registerCallback = (req: Request, res: Response) => {
  const data = req.body;

  if (data.uid && (data.success === true || (data.success === false && !!data.error))) {
    return res.status(204).send();
  } else {
    return res.status(400).json({ error: 'invalid format' });
  }
};

export default registerCallback;
