import { Request, Response } from 'firebase-functions';
const rp = require('request-promise-native');

const login = async (req: Request, res: Response) => {
  const baseUrl = 'https://bigboy.smashpass.net';
  const aciton = '/login';
  const url = `${baseUrl}${aciton}`;

  const data = {
    uid: 'abc123',
    smash: 'adsjfhalsdjfklsdajhfksadj',
  };

  const options = {
    method: 'POST',
    uri: url,
    body: data,
    json: true,
  };

  try {
    return res.json(await rp(options));
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default login;
