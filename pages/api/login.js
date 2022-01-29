import { createToken } from "../../helpers/jwt-utils";
import db from '../../helpers/couch-db';
import bcrypt from 'bcryptjs';

export default async function login(req, res) {
  if (req.method === 'POST') {
    console.log(req.body);
    const { email, password } = req.body;
    //return res.status(200).json({ token: createToken(req.body) });
    try {
      const users = db.use('users');

      const existingUser = (await users.find({
        selector: {
          email: {"$eq": email}
        }
      })).docs[0];

      if (existingUser && bcrypt.compareSync(password, existingUser.password)) {
        return res.status(200).json({ token: createToken(existingUser) });
      }
    } catch (err) {
      console.log(err);
      return res.status(401).json(err);
    }

    return res.status(401).json({ message: '[BE] Authentication failure' });
  }
}