import { createToken } from "../../helpers/jwt-utils";
import db from '../../helpers/couch-db';
import bcrypt from 'bcryptjs';

export default async function register(req, res) {
    if (req.method === 'POST') {
        console.log(req.body);
        const { email, password } = req.body;
        const users = db.use('users');
        const newUser = {
            ...req.body,
            password: await bcrypt.hash(password, 10)
        }
        users.insert(newUser);
        return res.status(200).json({ token: createToken({ email }) });
    }
}