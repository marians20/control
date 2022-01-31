import { createToken } from "../../../helpers/jwt-utils";
import UserService from "../../../services/user-service";

export default async function register(req, res) {
    if (req.method === 'POST') {
        console.log('req.body', req.body);
        try {
            let newUser = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password
            };

            const response = await UserService.create(newUser);
            newUser = { ...newUser, password: '********' };
            return response.isSuccess
                ? res.status(200).json({ token: createToken(newUser) })
                : res.status(404).json({ message: response.message });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(JSON.stringity(err));
        }
    }

    return res.status(405);
}