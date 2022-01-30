import { createToken } from "../../../helpers/jwt-utils";
import UserService from "../../../services/user-service";

export default async function register(req, res) {
    if (req.method === 'POST') {
        try {
            let newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
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