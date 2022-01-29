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

      // TODO - learn about CouchDb search or query documents
      const existingUser = await users.find({ email: email });

      const encryptedPassword = await bcrypt.hash(password, 10);

      console.log('Existing user', existingUser);

      if (existingUser && existingUser.password === encryptedPassword) {
        return res.status(200).json({ token: createToken(existingUser) });
      }
    } catch (err) {
      console.log(err);
      return res.status(401).json(err);
    }
    console.log('Authentication failure');
    return res.status(401).json({ message: 'Authentication failure' });
  }
}